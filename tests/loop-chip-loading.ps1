$ErrorActionPreference = 'Stop'
$html = Get-Content -Raw (Join-Path $PSScriptRoot '..\how-it-works.html')

if ($html -notmatch 'id="loopBoxProgress"') {
    throw 'The chip needs a loading-fill element.'
}

if ($html -notmatch 'progress\.setAttribute\(''width'',\(34\*boxT/st\.dur\)\.toFixed\(1\)\)') {
    throw 'The chip loading fill must advance with the processing stage.'
}

if ($html -match 'loopBoxGlow') {
    throw 'Only the loading fill should light up.'
}

'Chip loading animation verified.'
