# Architecture Overview  
GDPR-Compliant AEP → AJO → ACC → CJA Data Synchronization & Profile Governance

## 1. Objective
This document provides a structured view of the conceptual architecture for synchronizing profile attributes and consent signals across Adobe Experience Platform (AEP), Adobe Journey Optimizer (AJO), Adobe Campaign Classic (ACC), and Customer Journey Analytics (CJA) while maintaining GDPR compliance.

The goal is to ensure:
- Consistent profiles across AEP, AJO, and ACC  
- Real-time updates for journeys (AJO)  
- Batch-safe updates for campaigns (ACC)  
- No stitching of restricted identities under GDPR  
- Unified analytics through CJA  

---

## 2. Core Design Principles
1. **GDPR Label Enforcement**
   - C1/C2/C3 → Contract Labels  
   - I1/I2 → Identity Labels  
   - S1/S2/S3 → Sensitive Data Labels  
   - Only allowed fields are stitched and activated.
   - Restricted fields remain stored but never used for identity or segmentation.

2. **Dual-Channel Activation**
   - **AJO (real-time)** for triggered communications  
   - **ACC (batch)** for scheduled or bulk communications  

3. **Webhook Synchronization Layer**
   - AJO and ACC trigger webhook calls whenever consent or profile attributes change.
   - A small middleware normalizes the payload and pushes updates back to AEP using the AEP API.

4. **CJA for Analytics**
   - Only permitted fields (C1/C2/I1/I2) are passed.
   - Sensitive labels (S1/S2/S3) are excluded from export.
   - Provides standardized dashboards for journey drop-offs, activation rate, opt-out analysis, and attribution.

---

## 3. High-Level Flow
1. **Data Engineering → AEP**
   - Cleansed customer profile data arrives with corresponding governance labels.
   - Identity stitching occurs only for attributes allowed under labels.
   - XDM Profile contains:  
     - `email (I1)`  
     - `phone (I2)`  
     - `customer_id (C1)`  
     - `marketing_optin (C1)`  
     - `age_group (S1 - restricted from stitching)`  
     - `risk_score (S3 - cannot be used for segmentation)`

2. **AEP → AJO**
   - AJO receives the allowed subset of fields.
   - Real-time events trigger entry into journeys.
   - AJO updates opt-out/opt-in changes back through the webhook.

3. **AEP → ACC**
   - Nightly or scheduled sync.
   - ACC sends communication and posts delivery status → webhook → AEP.

4. **AEP → CJA**
   - Activation + profile events exported to CJA datasets.
   - CJA dashboards built on permissible metrics.

---

## 4. Webhook Trigger Logic
### AJO Trigger Points
- Profile updates via journey steps  
- Opt-in/Opt-out form submissions  
- Event-based consent changes  

### ACC Trigger Points
- Delivery logs (sent, open, bounce, complaint)
- Subscription/Unsubscribe table updates  
- Profile changes from call-center or batch loads  

The webhook service listens on:  
`/update-profile`  
and sends normalized patches to AEP’s `/profiles` endpoint.

---

## 5. Key CJA Metrics Included
- Journey entry rate  
- Drop-off rate per step  
- Opt-in → Activation rate  
- Consent change attribution  
- Channel contribution (Email/SMS/Push)  
- Profile match rate (allowed identity fields only)  
- Time-to-activation comparison (AJO real-time vs ACC batch)

Dashboards exclude S1/S2/S3 fields as required by governance policies.

---

## 6. Summary
This architecture provides:
- A privacy-first design  
- Consistent real-time + batch synchronization  
- Hardened governance alignment  
- Unified cross-channel reporting  
- Recruiter-friendly and audit-friendly documentation  

This is a conceptual reference useful for enterprise MarTech modernisation, Adobe implementations, and consent governance scenarios.
