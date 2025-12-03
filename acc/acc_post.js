var url = "https://yourwebhook.com/sync";
http.post({
    url: url,
    body: JSON.stringify({
        email: vars.recipient.email,
        consent: vars.recipient.consentStatus,
        timestamp: new Date().toISOString()
    }),
    headers: { "Content-Type": "application/json" }
});
