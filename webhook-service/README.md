Webhook Service
===============

Purpose:
Receive consent updates from AJO/ACC and push them into AEP (streaming/consent API)
and produce ACC override files.

Run locally:
1. cd webhook-service
2. npm install
3. export AEP_STREAM_URL="https://platform.adobe.io/..."
   export AEP_API_KEY="your-key"
   export AJO_REEVAL_URL="https://your-ajo-endpoint/reeval" (optional)
4. npm start
