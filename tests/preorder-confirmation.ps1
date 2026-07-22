$ErrorActionPreference = 'Stop'
$html = Get-Content -Raw (Join-Path $PSScriptRoot '..\preorder-confirmation.html')

foreach ($text in @(
    'Thank you for pre-ordering Dreamz',
    'check your email',
    'spam folder',
    'Your payment confirmation is on its way.'
)) {
    if (-not $html.Contains($text)) {
        throw "Missing preorder confirmation content: $text"
    }
}

'Preorder confirmation page verified.'
