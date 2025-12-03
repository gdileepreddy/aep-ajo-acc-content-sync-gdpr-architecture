// webhook.js - Consent Sync Microservice (Node.js / Express)
// NOTE: replace placeholder URLs / keys with real values in env.
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

const OVERRIDE_DIR = path.join(__dirname, "sftp_override");
if (!fs.existsSync(OVERRIDE_DIR)) fs.mkdirSync(OVERRIDE_DIR);

function validatePayload(p) {
  return p && p.customerId && p.consentType && (typeof p.value !== 'undefined');
}

app.post('/webhooks/consent', async (req, res) => {
  try {
    const payload = req.body;
    if (!validatePayload(payload)) {
      return res.status(400).json({ error: 'invalid_payload' });
    }

    const { customerId, consentType, value, source, timestamp } = payload;

    // 1) Persist to lightweight master consent store (for demo we write to file)
    const dbDir = path.join(OVERRIDE_DIR, 'db');
    if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir);
    fs.writeFileSync(path.join(dbDir, `${customerId}.json`), JSON.stringify({ customerId, consentType, value, source, timestamp || new Date().toISOString() }, null, 2));

    // 2) Update AEP via Streaming/Consent API (placeholder)
    try {
      await axios.post(process.env.AEP_STREAM_URL || 'https://platform.adobe.io/data/core/ingest/streams/demo', {
        customerId,
        consent: { [consentType]: value },
        sourceSystem: source || 'consent-service',
        timestamp: timestamp || new Date().toISOString()
      }, {
        headers: { 'x-api-key': process.env.AEP_API_KEY || 'demo-key' }
      });
    } catch (err) {
      console.warn('AEP stream update skipped:', err.message);
    }

    // 3) Write ACC override CSV (so ACC ingestion can pick it up)
    const csvPath = path.join(OVERRIDE_DIR, 'acc_override.csv');
    const row = `${customerId},${consentType},${value},${timestamp || new Date().toISOString()}\n`;
    fs.appendFileSync(csvPath, row);

    // 4) Optionally notify AJO to reevaluate (if you have API)
    if (process.env.AJO_REEVAL_URL) {
      try {
        await axios.post(process.env.AJO_REEVAL_URL, { customerId });
      } catch (err) {
        console.warn('AJO reevaluation failed:', err.message);
      }
    }

    return res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.error('webhook error', err);
    return res.status(500).json({ error: 'server_error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`consent webhook running on ${PORT}`));
