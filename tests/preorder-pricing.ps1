$ErrorActionPreference = 'Stop'
$html = Get-Content -Raw (Join-Path $PSScriptRoot '..\index.html')
$fullOption = [regex]::Match($html, '<div class="preorder-option" data-preorder-panel="full" hidden>([\s\S]*?)</div>\s*</div>\s*<ul class="preorder-option-fine">').Groups[1].Value

if ($fullOption -match 'class="price"') {
    throw 'The full-purchase option must not repeat the top price.'
}

'Preorder pricing verified.'
