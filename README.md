# AEP–AJO–ACC Consent Sync Architecture
GDPR-aware, end-to-end consent & identity governance for Adobe Experience Cloud
(Designed for Retail Banking)

This repository contains:
- AEP XDM column mappings (C/I/S labels)
- Segment definitions for AJO (real-time) and ACC (batch)
- Webhook microservice (Node.js) to sync opt-outs bi-directionally
- ACC override file handling
- CJA dataset and metrics guidance
- ASCII architecture diagrams and sequence

Key rule: If **C3** (contractual no-combine) OR **S1** (sensitive) is set on a record, that record MUST be excluded from identity stitching and from any marketing activation. Profiles may be stored in restricted datasets for audit only.

Deploy:
1. Deploy webhook-service (AWS Lambda / GCP / Azure / Node host)
2. Configure AJO custom action to POST to webhook
3. Configure ACC workflow to POST to webhook when unsubscribes are extracted
4. Ensure AEP streaming/ingest API updates profiles
5. CJA reads only hashed/approved profile/event datasets
