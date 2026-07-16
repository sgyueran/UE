$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Source = Join-Path $Root ".codex\skills"

if ($env:CODEX_HOME) {
    $Target = Join-Path $env:CODEX_HOME "skills"
} else {
    $Target = Join-Path $HOME ".codex\skills"
}

New-Item -ItemType Directory -Force -Path $Target | Out-Null

Get-ChildItem -Directory $Source | ForEach-Object {
    $Destination = Join-Path $Target $_.Name
    if (Test-Path $Destination) {
        Remove-Item -Recurse -Force $Destination
    }
    Copy-Item -Recurse -Force $_.FullName $Destination
    Write-Host "Installed $($_.Name)"
}

Write-Host "`nInstalled skills to $Target"
