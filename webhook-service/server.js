import express from "express";
import fetch from "node-fetch";
import { enforceGovernance } from "./utils/governance.js";

const app = express();
app.use(express.json());

app.post("/sync", async (req, res) => {
    let data = req.body;

    // enforce GDPR + AEP governance restrictions
    data = enforceGovernance(data);

    await fetch("https://platform.adobe.io/data/core/ups/profile", {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${process.env.AEP_IMS_TOKEN}`,
            "x-api-key": process.env.AEP_API_KEY,
            "x-gw-ims-org-id": process.env.AEP_ORG_ID,
            "x-sandbox-name": process.env.AEP_SANDBOX,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    res.json({ status: "synced" });
});

app.listen(3000, () => {
    console.log("Webhook service listening on port 3000");
});
