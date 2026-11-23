# Purge Cloudflare cache for The Ink Engine (theinkengine.art)
# Usage:
#   .\scripts\purge-cloudflare.ps1                  # purge everything
#   .\scripts\purge-cloudflare.ps1 -Files "https://theinkengine.art/blog/index.html","https://theinkengine.art/images/blog/x.jpg"
# Token stored outside the repo: ~/.config/opencode/keys/cloudflare-token.txt
# Zone ID: 39c880b9a32f4c16464b62f6e7ca0aaf

param(
    [string[]]$Files = @(),
    [string]$TokenFile = "$env:USERPROFILE\.config\opencode\keys\cloudflare-token.txt",
    [string]$ZoneId = "39c880b9a32f4c16464b62f6e7ca0aaf"
)

if (-not (Test-Path -LiteralPath $TokenFile)) {
    throw "Token file not found: $TokenFile"
}
$token = (Get-Content -LiteralPath $TokenFile -Raw).Trim()
if ([string]::IsNullOrWhiteSpace($token)) {
    throw "Token file is empty: $TokenFile"
}

$body = if ($Files.Count -gt 0) {
    @{ files = $Files } | ConvertTo-Json -Compress
} else {
    '{"purge_everything":true}'
}

$bodyFile = Join-Path $env:TEMP "purge_body.json"
Set-Content -LiteralPath $bodyFile -Value $body -NoNewline -Encoding ascii

Write-Host "Purging Cloudflare cache (zone $ZoneId)..."
$result = & curl.exe -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZoneId/purge_cache" `
    -H "Authorization: Bearer $token" `
    -H "Content-Type: application/json" `
    --data-binary "@$bodyFile"

Write-Host $result

$parsed = $result | ConvertFrom-Json
if (-not $parsed.success) {
    throw "Purge failed: $($parsed.errors | ConvertTo-Json -Compress)"
}
Write-Host "OK: cache purged."
