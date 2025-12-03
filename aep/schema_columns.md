Field Name              | Label | Category                      | Profile? | Stitch? | Notes
----------------------- | ------| ------------------------------| -------- | ------- | ---------------------------
customerId              | I2    | Pseudonymous Identity         | Yes      | Yes     | Stable profile ID (non-PII)
email                   | I1,C2 | PII + Contract Marketing      | Yes      | Yes*    | *Only if C3=false & S1=false
phone_e164              | I1,C2 | PII + Contract Marketing      | Yes      | Yes*    | Same rule as email
first_name              | C2    | Allowed for personalization   | Yes      | No      | Cannot be used for identity
last_name               | C2    | Allowed for personalization   | Yes      | No      |
postal_code             | S2    | Sensitive: Location           | Yes      | No      |
gender                  | S2    | Sensitive: Demographics       | Yes      | No      |
age_group               | S3    | Low-sensitivity demographic   | Yes      | No      |
consent.email           | C1    | Contract: Consent state       | Yes      | No      | Used in activation gating
consent.sms             | C1    | Contract: Consent state       | Yes      | No      |
consent.push            | C1    | Contract: Consent state       | Yes      | No      |
contract_flags.c3       | C3    | Contractual Restriction       | No       | No      | ❗ Overrides all marketing
sensitive_flags.s1      | S1    | Highly sensitive              | No       | No      | ❗ No marketing, no profiles
sensitive_flags.s2      | S2    | Medium sensitive              | Yes      | No      |
sensitive_flags.s3      | S3    | Low sensitive                 | Yes      | No      |
product_holdings        | S1    | Highly sensitive (finance)    | No       | No      | Cannot go to AJO/ACC
last_txn_ts             | S1    | Financial event timestamp     | No       | No      |
event.emailSent         | S3    | Event-level behavioral        | N/A      | N/A     |
event.emailOpen         | S3    | Event-level behavioral        | N/A      | N/A     |
event.emailClick        | S3    | Event-level behavioral        | N/A      | N/A     |
hashed_profile_id       | I2    | Pseudonymous identity         | Yes      | Yes      | Used for CJA safely
record_ts               | None  | Metadata                      | No       | No      |
