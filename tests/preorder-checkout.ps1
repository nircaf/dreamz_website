$html = Get-Content -Raw (Join-Path $PSScriptRoot '..\index.html')

$required = @(
    'class="preorder-options"',
    'Full purchase',
    'Deposit',
    '$29.90',
    '$199.90',
    'buy_btn_1TuGBLHoabhlm1T9Gvl6SOIo',
    'buy_btn_1TuGD9Hoabhlm1T9JM0NXBBL',
    'https://js.stripe.com/v3/buy-button.js'
)

foreach ($text in $required) {
    if (-not $html.Contains($text)) {
        throw "Missing preorder checkout markup: $text"
    }
}

$legacyPattern = '(?i)shop' + 'ify|myshop' + 'ify'
if ($html -match $legacyPattern) {
    throw 'Legacy checkout remnants found in index.html.'
}

'Preorder checkout markup verified.'
