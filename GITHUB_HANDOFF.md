# KINFORM and KNIALL GitHub Handoff

## Export-ready scope

This repository contains the fictional **KINFORM** portfolio flagship and the underlying KNIALL Shopify foundation. The KINFORM experience includes collection, product, inventory, order-request, journal, support, account, bag, checkout-preview, and portfolio administration workflows. All ordering, inventory, payment, customer, fulfilment, and feedback data shown in the KINFORM routes is deliberately fictional and clearly labelled in the interface.

The repository has been checked for export hygiene. Dependency folders and build output are ignored, as are local environment files and logs. No generated build output is tracked.

| Area | Handoff status |
|---|---|
| Product render system | Four isolated KINFORM garment renders, including final transparent Aero Shell, Form Overshirt, and Arc Trouser assets. |
| Visual verification | Desktop and mobile checks completed for the hero, collection, product, inventory, and administration routes. |
| Product and owner flow | Size-level fictional availability request can be staged and reviewed through a non-transactional owner workflow. |
| Code validation | TypeScript check, two focused test files with five passing tests, and production build passed. |
| Real KNIALL commerce | Pending approved KNIALL product data. The connected Shopify development store is intentionally empty. |

## Export to GitHub

1. Open the project management panel and select **GitHub**.
2. Choose the GitHub owner and repository name, for example `kinform-commerce-portfolio`.
3. Create the repository from the current checkpoint.
4. Confirm the repository visibility before sharing the link with a client or recruiter.

The latest complete portfolio checkpoint is **b39f4b8e**. Create a new checkpoint after this handoff file is committed, then export that newer checkpoint instead.

## Local continuation

```bash
pnpm install
pnpm check
pnpm exec vitest run server/kinform.catalogue.test.ts server/gradientShimmer.test.ts
pnpm build
```

The full test suite currently includes a live Shopify smoke test for the real KNIALL development store. It is expected to fail until an approved KNIALL product with real title, price, media, variants, and availability has been added to Shopify.

## Environment handling

Environment files are intentionally ignored. Do not commit application keys, Shopify tokens, OAuth secrets, or database credentials. When moving the project outside the managed environment, configure the corresponding secrets through the destination host’s secret-management interface and validate the Shopify Storefront API connection before enabling a real purchase flow.

## Next real-commerce handoff

To make the KNIALL foundation operational, provide approved item names, PHP prices, colourways, available sizes, stock policy, product descriptions, and final product photography. Seed those genuine items into Shopify, verify the Storefront API catalogue, and only then enable live variant, bag, and checkout handoff.
