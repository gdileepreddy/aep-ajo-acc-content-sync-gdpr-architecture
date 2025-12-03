AJO Setup Notes:
1. Create Custom Action -> HTTP call to /webhooks/consent
2. Add custom action node in the unsubscribe branch
3. Payload example:
{
  "customerId": "CUST-12345",
  "consentType": "email",
  "value": false,
  "source": "AJO",
  "timestamp": "2025-12-03T09:00:00Z"
}
4. On successful POST, mark journey instance as unsubscribed
