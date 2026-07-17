$html = Get-Content -Raw (Join-Path $PSScriptRoot '..\index.html')

$required = @(
    'class="preorder-options"',
    'Full purchase',
    '1-year subscription included',
    'Deposit',
    '1-month subscription included',
    'class="checkout-loading"',
    'Loading secure checkout',
    'loading.classList.add("is-hidden")',
    '$29.90',
    '$199.90',
    "id='product-component-1784253640033'",
    "id='product-component-1784253389179'",
    "createProduct('9197946175651', 'product-component-1784253640033'",
    "createProduct('9197963313315', 'product-component-1784253389179'"
)

foreach ($text in $required) {
    if (-not $html.Contains($text)) {
        throw "Missing preorder checkout markup: $text"
    }
}

if ([regex]::Matches($html, "ui\.createComponent\('product'").Count -ne 1) {
    throw 'Expected one shared Shopify Buy Button component factory.'
}

'Preorder checkout markup verified.'
