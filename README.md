# AEP – AJO – ACC GDPR-Compliant Consent Sync (Using C1/C2/C3, I1/I2, S1/S2/S3 Labels)

This repository explains an end-to-end, GDPR-aware consent synchronisation design across Adobe Experience Platform (AEP), Adobe Journey Optimizer (AJO), and Adobe Campaign Classic (ACC). The solution handles identity stitching rules, governance labels, real-time vs batch mismatches, and reporting via Customer Journey Analytics (CJA).

The goal is to keep all platforms aligned so customers receive compliant, consistent communications.

---

## 1. Why This Solution Is Needed

Enterprises often face these issues:

- AJO updates consent in real-time, ACC updates in batch.
- AEP is the source of truth, but becomes outdated if individual tools update consent independently.
- GDPR governance labels (C1/C2/C3, I1/I2, S1/S2/S3) restrict activation and stitching.
- CJA requires clean, aligned, privacy-compliant datasets.

This solution resolves all mismatches and synchronises consent across all platforms.

---

## 2. Governance Labels Used in This Project

### Identity Labels
- **I1** – Anonymous or behavioural identity (ECID)
- **I2** – PII identity (email, phone)

### Contract Labels
- **C1** – Contractually allowed for processing  
- **C2** – Allowed for marketing/communications  
- **C3** – Restricted; cannot be stitched or activated  

### Sensitive Labels
- **S1 / S2** – Sensitive data permitted with controls  
- **S3** – Highly sensitive; cannot be stitched or activated  

These labels determine what AEP can stitch, activate, or export to AJO/ACC.

---

## 3. Minimal Schema for This Solution

This project uses a small, practical schema that demonstrates how governance labels work:

- **Email** (I2, C2) – primary identity, marketing allowed  
- **ECID** (I1, C1) – secondary behavioural identity  
- **Phone Number** (I2, C2)  
- **Email Opt-In** (C2)  
- **SMS Opt-In** (C2)  
- **Gender** (S1)  
- **Date of Birth** (S2)  
- **High-Risk Attribute** (S3, C3) – intentionally blocked from activation  

Fields with **C3 or S3 labels** are excluded from stitching, segmentation, and activation.

---

## 4. End-to-End AEP → AJO → ACC Flow

### Step 1: Data Enters AEP
AEP ingests identities, consent data, and profile attributes.  
Governance labels ensure:
- Restricted data (C3, S3) is never used in activation.
- Stitching is permitted only when identity and contract labels allow it.

### Step 2: Profile & Segmentation in AEP
Profiles are stitched with allowed identities.  
Segments are built using fields that respect governance policies.

### Step 3: AJO Real-Time Activations
AJO receives profiles that:
- Are stitched correctly  
- Have valid consent (C2)  
- Do not contain restricted fields (C3, S3)  

AJO triggers real-time email/SMS journeys.

### Step 4: ACC Batch Activations
ACC receives nightly profile extracts from AEP and sends scheduled campaigns based on valid consent.

---

## 5. The Real-Time vs Batch Consent Mismatch Issue

- AJO updates consent immediately (real-time).  
- ACC updates consent via batch workflow (nightly).

This creates latency problems where AEP, AJO, and ACC may show different consent values.

---

## 6. Webhook-Based Sync Design (Explained, Code Not Included Here)

To fix the mismatch, both AJO and ACC call a lightweight webhook whenever consent changes.

### What the Webhook Achieves

If **AJO updates consent**:
- Webhook updates AEP instantly  
- ACC picks up updated consent in the next batch  
- All activation tools stay aligned  

If **ACC updates consent**:
- Webhook updates AEP instantly  
- AJO immediately uses the updated consent for journeys  

AEP remains the single source of truth.

Detailed webhook explanation is provided in `/webhook/webhook-overview.md`.

---

## 7. Use of CJA for Reporting

CJA receives a simplified dataset from AEP containing:
- Identity (I1, I2)  
- Consent flags  
- Channel preferences  
- Stitching success indicators  
- Segment membership  
- Journey execution timestamps  

### Common CJA Metrics in This Design

- Opt-in vs opt-out trends  
- Channel preference analytics (email vs SMS)  
- Consent latency (real-time AJO vs batch ACC)  
- Stitching success/failure rates  
- Governance-restricted profile volumes (C3/S3 exclusions)  
- Weekly delivery & engagement metrics  

---

## 8. Business Outcome

- Consent becomes consistent across AEP, AJO, and ACC.  
- GDPR restrictions (C3/S3) are enforced correctly.  
- Identity stitching becomes reliable and compliant.  
- Real-time (AJO) and batch (ACC) consent mismatches are eliminated.  
- AEP becomes the trusted source of truth for all channels.  
- CJA receives clean, aligned data for insights and reporting.  

---

This project demonstrates how to design an Adobe Experience Cloud architecture that respects GDPR, fixes common data-sync issues, and provides a transparent, analytics-ready customer experience.
