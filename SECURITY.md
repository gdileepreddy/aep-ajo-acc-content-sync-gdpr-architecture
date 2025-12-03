# Security Policy

This repository represents an architectural reference for an AEP → AJO → ACC data governance and GDPR-aligned event flow.  
While it does not contain production code, the security principles below apply to the concepts and patterns described.

## Supported Security Practices

This repository demonstrates security expectations aligned with:
- GDPR-compliant data processing
- Event encryption between systems
- Minimal data retention and purpose limitation
- Secure webhook communication patterns
- API key and secret isolation
- No PII exposure in logs or payload examples

## Reporting a Vulnerability

Since the repository contains only conceptual architecture and sample references, there are:
- No running services  
- No active endpoints  
- No real credentials or API keys  

If you still identify any inconsistency, misrepresentation, or documentation risk:

1. Open an Issue describing the concern  
2. Do not include any sensitive information  
3. Provide recommended remediation steps  

## Security Considerations Included in This Architecture

- Webhook calls require authentication and signature validation  
- Only non-PII operational data should pass through event triggers  
- Consent (C1, C2, C3) and Subscription State (S1, S2, S3) logic respects GDPR lawful basis  
- Any identity fields (I1, I2) are subject to hashing or tokenization in real implementations  
- ACC integrations must ensure that marketing profiles respect user consent state captured in AEP  
- Data minimization: all payload samples exclude personal identifiers  

## Responsible Usage Disclaimer

This project is for educational and architecture demonstration purposes only.  
No part of this repository should be used as-is for production without proper security review, data governance validation, and internal compliance checks.
