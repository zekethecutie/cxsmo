# C✦SMO Locale, Checkout, and Legal Validation

The C✦SMO account and checkout paths are intentionally **browser-local portfolio simulations**. The implementation carries locale, currency, destination, bag, save, and preference state in browser storage. It uses the browser locale only to select a presentational default for supported country/currency combinations; it does not claim live exchange conversion, merchant coverage, parcel availability, or customer identification.

| Surface | Verified contract | Remaining manual check |
|---|---|---|
| Locale preference | The profile model stores locale and the supported USD, PHP, JPY, CNY, and EUR display choices locally. Region-aware defaults cover the Philippines, Japan, China, and selected European locales. | Change locale/currency through the account surface and review formatted prices in an actual browser. |
| Address map preview | A destination is used only for a client-side map preview. The map marker is explicitly labelled as browser-only. | Enter a real test city, then confirm map loading and address changes using the live Maps integration. |
| Checkout consent | The four-stage flow labels itself as display-only; staging remains disabled until the visitor acknowledges the boundary. Successful staging explicitly creates no order, receipt, payment, delivery, or personal-data record. | Traverse the full populated-bag flow using keyboard and touch. |
| Legal information | Portfolio disclosure, privacy, terms, and legal routes are publicly registered in the active route map. | Read each complete document under both appearance modes and with assistive technology. |

> **Validation boundary:** Automated checks cover source-level local-only, consent, map-preview, and legal-route contracts. They do not claim to test a live Maps response, a real customer address, a transaction, or a merchant workflow.
