System Flow: GDPR-Compliant AEP → AJO → ACC → CJA Architecture

This document describes the end-to-end system workflow developed for a banking retail use case, where customer data flows from engineering pipelines into Adobe Experience Platform, triggers real-time and batch campaigns, synchronizes opt-outs, and powers downstream analytics in CJA.

------------------------------------------------------------
Section 1: Data Ingestion from Engineering
------------------------------------------------------------

The data engineering team delivers a daily batch with the following fields:

customer_id (C1, I1)  
email (C1, I1)  
phone_number (C1, I2)  
marketing_optin (C1)  
last_transaction_date (C2)  
age_group (S1)  
credit_risk_score (S3)  
branch_code (C2)  
unsubscribe_source (C1)

The fields labeled C1 and identity labels (I1, I2) are safely ingestible into AEP Profile.  
C2 fields are analytic-only.  
S1, S2, S3 sensitive fields are allowed in AEP Data Lake but restricted from identity stitching and activation.

------------------------------------------------------------
Section 2: XDM Schema and Profile Setup
------------------------------------------------------------

A customer schema is created using the Individual Profile class.  
customer_id, email, and phone_number become identity fields.  
Consent (marketing_optin) is used for segmentation.  
S1 and S3 fields are stored for internal analytics but do not join the identity graph.

AEP Profile merges all allowed identity fields and forms unified customer profiles.

------------------------------------------------------------
Section 3: Segmentation
------------------------------------------------------------

Two example segments are created:

Segment A: High-Value Customers (< 100k profiles) using:  
C1 attributes, I1 identity stitching, C2 allowed for scoring logic.  
Activation platform: AJO (real-time)

Segment B: Monthly Engagement Audience (~700k profiles) using:  
C1 fields only, large audience size suitable for batch delivery.  
Activation platform: ACC (batch execution)

Sensitive attributes and Contract C3 fields are excluded by governance enforcement.

------------------------------------------------------------
Section 4: AJO Real-Time Activation
------------------------------------------------------------

Segment A is activated to Adobe Journey Optimizer.  
AJO triggers an immediate email and SMS journey.  
Webhook Logic: When a user clicks “unsubscribe” inside email or SMS, AJO calls the webhook endpoint.  
The webhook updates AEP in real-time with new opt-out status.

This ensures fast GDPR consent propagation.

------------------------------------------------------------
Section 5: ACC Batch Activation
------------------------------------------------------------

Segment B is exported to Adobe Campaign Classic.  
ACC sends a weekly batch campaign by email.  
ACC unsubscription events also call the same webhook endpoint.  
The webhook pushes the updated consent back to AEP, ensuring both systems remain synchronized.

This solves the real-time vs batch inconsistency problem between AJO and ACC.

------------------------------------------------------------
Section 6: Webhook Synchronization Logic
------------------------------------------------------------

A single centralized webhook service is created.  
Both AJO and ACC call this webhook when opt-outs occur.  
The webhook performs the following steps:

1. Parse the identity (email or customer_id)  
2. Validate that field labels allow writing back to Profile  
3. Update the marketing_optin flag to false in AEP using the Data Access API  
4. Store a log entry for audit purposes  
5. Return confirmation to AJO/ACC

This prevents duplicated consent mismatches and ensures GDPR auditability.

------------------------------------------------------------
Section 7: CJA Analytics Configuration
------------------------------------------------------------

CJA connects to AEP Experience Events and Profile data through a sanitized dataset.  
Only allowed fields are exported:

Allowed for analytics:  
customer_id  
email  
branch_code  
last_transaction_date  
marketing_optin  
journey_entry_timestamp  
campaign_id  
channel_type  

Not exported:  
age_group (S1)  
credit_risk_score (S3)  
any C3-labeled attributes

CJA dashboards deliver insights such as:

Campaign Delivery Rate  
Segment Reach vs. Activation Rate  
Email vs. SMS Channel Conversion  
Customer Journey Paths  
Drop-Off Points  
Profile Growth Trends  
Opt-Out Trend Analysis  
Real-Time vs Batch Campaign Comparison  

------------------------------------------------------------
Section 8: End-to-End Summary
------------------------------------------------------------

1. Data Engineering sends customer data with C1, C2, C3, I1, I2, S1, S2, S3 labels.  
2. AEP ingests data, applies governance, and builds Profiles.  
3. Segments are created for real-time (AJO) and batch (ACC) use cases.  
4. AJO executes real-time communication for smaller segments.  
5. ACC executes weekly batch campaigns for larger segments.  
6. Both AJO and ACC send opt-out events to a centralized webhook.  
7. The webhook updates AEP in near real-time with consent changes.  
8. CJA receives sanitized datasets and provides activation, consent, and journey analytics.

This flow ensures a fully GDPR-compliant orchestration model across AEP, AJO, ACC, and CJA with unified identity governance, sanitized analytics, and synchronized consent management.
