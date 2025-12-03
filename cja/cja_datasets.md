CJA Input Datasets (privacy-safe):
- AEP Profile snapshot (hashed_customerId, consent flags, non-sensitive attributes)
- AEP ExperienceEvent (emailSent, emailOpen, emailClick, optOut)
- Consent event dataset (opt-outs with timestamp and source)
NOTES: Never ingest raw PII into CJA. Use hashed ids and coarse attributes.
