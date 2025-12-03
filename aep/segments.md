Segment: RT_AbandonedCart (<100k) -> AJO
- condition: last_txn_ts within 48 hours AND consent.email=true AND consent.c3=false AND sensitive.s1=false

Segment: WeeklyPromo (~700k) -> ACC
- condition: product_holdings contains 'retail' AND consent.email=true AND consent.c3=false AND sensitive.s1=false

Global Suppression list:
- any profile where consent.email=false OR consent.sms=false OR consent.c3=true OR sensitive.s1=true
