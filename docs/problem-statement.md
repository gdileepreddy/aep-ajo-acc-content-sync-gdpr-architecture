Problem Statement: Unified GDPR-Compliant Customer Activation and Analytics Across AEP, AJO, ACC, and CJA

The banking retail organisation manages customer communication across multiple channels, systems, and data flows. However, the existing landscape presents several challenges that create operational friction, customer experience issues, and GDPR compliance risks.

Challenge 1: Fragmented Customer Data  
Customer data arrives from the data engineering team with a mixture of contract-governed (C1, C2, C3), identity (I1, I2), and sensitive attributes (S1, S2, S3). These fields have different governance restrictions, which makes it difficult to determine:  
- which data can be stitched for identity resolution,  
- which data can be activated for campaigns,  
- which data can be exposed to analytics,  
- and which data must remain restricted.

Challenge 2: Real-Time vs Batch Activation Split  
Two activation systems are in use:  
- Adobe Journey Optimizer (AJO) for real-time journeys  
- Adobe Campaign Classic (ACC) for batch, large-volume campaigns  

These systems operate with different cadences. AJO requires near real-time consent and profile updates, while ACC works on scheduled batch exports. This creates synchronization gaps in customer consent:  
- AJO may send a message before ACC captures an opt-out  
- ACC may send a weekly email even after the customer unsubscribed through AJO  
- Consent changes do not propagate consistently

Challenge 3: Consent Consistency and GDPR Obligations  
GDPR requires that the organisation:  
- maintain accurate customer marketing consent  
- ensure removal from communication lists immediately upon opt-out  
- prevent sensitive data (S1–S3) from being used in activation  
- ensure C3-governed fields are never used for stitching or activation  

The existing platforms cannot independently guarantee this alignment.

Challenge 4: Downstream Analytics Limitations  
Adobe Customer Journey Analytics (CJA) requires clean, compliant datasets. Sensitive attributes (S1–S3) cannot be shared. ACC and AJO also produce different types of events with different timestamps and structures. Without a consistent model:  
- customer journeys are fragmented  
- attribution becomes unreliable  
- opt-out reporting becomes inconsistent  
- conversion analysis is incomplete

Challenge 5: Lack of Unified Oversight  
There is no single central service that:  
- receives opt-out events from both AJO and ACC  
- validates that the fields pass governance checks  
- updates AEP Profile instantly  
- generates a complete audit trail  
- ensures downstream analytics reflect updated consent

------------------------------------------------------------
Solution Objective
------------------------------------------------------------

Design an end-to-end, GDPR-compliant, multi-system architecture that ensures:  
- governed ingestion of customer data into AEP,  
- accurate identity stitching based only on I1 and I2 fields,  
- activation of real-time and batch segments across AJO and ACC,  
- centralized consent synchronization via webhook,  
- immediate profile updates in AEP,  
- downstream analytics powered through sanitized CJA datasets,  
- full governance enforcement for C1, C2, C3, S1, S2, and S3 attributes.

------------------------------------------------------------
Outcome Expected
------------------------------------------------------------

By implementing this architecture, the organisation achieves:  
- a unified customer profile across channels  
- immediate GDPR-compliant consent propagation  
- zero delays between real-time and batch systems  
- reliable analytics and customer journey reporting  
- reduced operational overhead  
- improved governance posture  
- future-readiness for scaling into new communication channels
