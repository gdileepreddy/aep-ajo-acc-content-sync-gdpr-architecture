ACC Workflow Notes:
1. Daily/weekly export of segment file from AEP
2. Workflow:
   - Import segment file
   - Prepare send list
   - Pre-send step: import /sftp/override/acc_override.csv (apply suppression)
   - Send campaign
   - Post-send: extract unsubscribes and POST to /webhooks/consent
3. Ensure pre-send override is processed before main send job
