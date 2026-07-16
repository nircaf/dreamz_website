# Shopify preorder checkout design

## Goal

Keep the Dreamz product presentation and purchase-option selection inside the existing `index.html#cta` section, then hand the selected option to Shopify checkout. Shopify owns buyer email, shipping address, payment, and order records.

## Interface

The preorder section shows two native selectable cards:

- Pre-order deposit: `$29.90`, including one month of subscription.
- Full pre-order: `$199.90`, including one year of subscription.

The deposit option is selected initially. A single `Checkout with Shopify` link reflects the selected card and remains keyboard accessible. The existing product gallery and visual style stay in place.

## Checkout flow

Each card stores its Shopify variant checkout URL in HTML. Selecting a card updates `aria-checked`, the selected styling, and the checkout link. Activating checkout sends one unit of the chosen Shopify variant to Shopify. Shopify then collects email, shipping address, and payment.

Variant mapping:

- `$29.90`: `48622284210368`
- `$199.90`: `48622284243136`

## Failure handling

The checkout link uses ordinary HTTPS navigation, so it works without JavaScript for the default deposit option. JavaScript only changes the selected option. Shopify storefront password protection must be disabled before customer checkout can work.

## Scope

- Update only the canonical preorder flow in `index.html`.
- Remove the obsolete custom Storefront API checkout script from `index.html`.
- Do not install the Shopify Buy Button sales channel or add a JavaScript dependency.
- Update `SHOPIFY_PRODUCT_SETUP.md` after successful implementation and verification.

## Verification

- Confirm both option cards and prices render in `index.html`.
- Confirm the default checkout URL contains the deposit variant.
- Confirm selecting the full option changes the checkout URL to the full-price variant.
- Confirm the obsolete store domain and Storefront token are absent from `index.html`.
- Confirm Shopify checkout navigation after the storefront password is disabled.
