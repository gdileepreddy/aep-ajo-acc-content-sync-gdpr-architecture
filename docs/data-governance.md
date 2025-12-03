Data Governance in Adobe Experience Platform  
Understanding C1, C2, C3, I1, I2, S1, S2, S3 Labels & Their Impact on Data Usage

This document explains how AEP governance labels control usage across identity stitching, segmentation, activation, AJO, ACC, and CJA. This is essential for GDPR-compliant architectures.

------------------------------------------------------------
Section 1: Overview of AEP Governance Labels
------------------------------------------------------------

C — Contract Labels  
C1: Data allowed for activation and profiling.  
C2: Data allowed only for analytics.  
C3: Restricted contractual usage; segmentation and activation blocked.

I — Identity Labels  
I1: Primary identity fields used for profile stitching.  
I2: Secondary identity fields used only if policies allow.

S — Sensitive Data Labels  
S1: Mildly sensitive data; restricted stitching.  
S2: Medium-sensitive; cannot be used for segmentation/activation.  
S3: Highly sensitive, fully restricted from segmentation, activation, stitching, CJA export.

------------------------------------------------------------
Section 2: Example Banking Project Schema
------------------------------------------------------------

Column: customer_id  
Description: Unique customer identifier  
Labels: C1, I1  

Column: email  
Description: Login and communication email  
Labels: C1, I1  

Column: phone_number  
Description: Mobile number for SMS  
Labels: C1, I2  

Column: marketing_optin  
Description: Consent for marketing  
Labels: C1  

Column: last_transaction_date  
Description: Transaction activity date  
Labels: C2  

Column: age_group  
Description: Demographic indicator  
Labels: S1  

Column: credit_risk_score  
Description: Financial risk indicator  
Labels: S3  

Column: branch_code  
Description: Branch identifier  
Labels: C2  

Column: unsubscribe_source  
Description: Source of opt-out  
Labels: C1

------------------------------------------------------------
Section 3: Fields Allowed for Identity Stitching
------------------------------------------------------------

Allowed:  
customer_id (I1)  
email (I1)  
phone_number (I2)

Not allowed:  
age_group (S1)  
credit_risk_score (S3)  
any C3, S2, S3 fields

------------------------------------------------------------
Section 4: Governance Impact on Adobe Systems
------------------------------------------------------------

AEP (Profile & Segmentation)
- Only I1/I2 identities used for stitching.
- S1/S2/S3 excluded from stitching.
- C3 fields blocked for segmentation.
- C2 fields allowed for reporting only.

AJO (Real-time Activation)
- Only C1 fields exported.
- Identities with I1/I2 allowed.
- S1/S2/S3 never exported.
- Consent changes trigger webhook calls.

ACC (Batch Activation)
- Only C1 fields activated.
- Batch campaign opt-outs trigger webhook calls.
- ACC sends subscription updates back to AEP.

CJA (Analytics)
- Receives allowed event attributes.
- Excludes C3, S1/S2/S3 fields.
- Supports identity stitching using I1/I2.
- Used for campaign performance and funnel insights.

------------------------------------------------------------
Section 5: Example Governance Policies
------------------------------------------------------------

Policy 1: Data with S1 cannot participate in identity stitching.  
Result: age_group excluded from profile graph.

Policy 2: Data with S3 cannot be activated.  
Result: credit_risk_score stays inside AEP only.

Policy 3: Data with C3 cannot be used for segmentation.  
Result: C3 fields stored but segmentation is blocked.

------------------------------------------------------------
Section 6: Summary
------------------------------------------------------------

This governance model ensures:
- GDPR-compliant identity stitching  
- Sensitive data isolation  
- Contract-safe activation flows  
- Real-time and batch activation restrictions  
- Analytics (CJA) using only permitted, sanitized data  

This is the foundation for compliant enterprise-grade AEP/AJO/ACC/CJA deployments in banking, insurance, and other regulated industries.
