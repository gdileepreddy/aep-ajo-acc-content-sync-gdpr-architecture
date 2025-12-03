# GDPR-Compliant Consent Sync Architecture Across AEP, AJO, ACC & CJA

This repository provides an end-to-end reference architecture that solves the challenge of synchronizing customer consent in real time (AJO) and batch (ACC) 
while maintaining GDPR compliance and delivering analytics via CJA.

# Use Case (Retail Banking)

Banks often run:
- Real-time communication via **AJO**
- Batch campaigns via **ACC**
- Identity & consent governance in **AEP**
- Analytics and marketing intelligence in **CJA**

The problem:
- Opt-outs in AJO should update AEP immediately before ACC runs
- Opt-outs in ACC should update AEP immediately before AJO triggers
- Some data values (S1, C3) cannot be stitched into AEP profile
- CJA only consumes AEP data, not ACC logs

This repo solves it using:
- AEP as source of truth
- A webhook microservice
- AJO Custom Action API calls
- ACC workflow HTTP API calls
- AEP Consent API
- GDPR-aware schema design

