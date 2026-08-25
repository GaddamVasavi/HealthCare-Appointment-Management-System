$root = Split-Path -Parent $PSScriptRoot
$extensions = @('.ts', '.tsx', '.js', '.jsx', '.css', '.md', '.json')
$excluded = '\\(node_modules|dist|build|coverage|\.git)\\'
$files = Get-ChildItem $root -Recurse -File | Where-Object {
  $_.Extension -in $extensions -and $_.FullName -notmatch $excluded
}
$groups = @{
  'Frontend' = 'frontend'
  'Admin panel' = 'admin-panel'
  'Backend' = 'backend'
  'Shared and docs' = 'shared|docs|scripts'
}
$total = 0
foreach ($group in $groups.GetEnumerator()) {
  $groupFiles = $files | Where-Object { $_.FullName -match "\\($($group.Value))\\" }
  $lines = ($groupFiles | Get-Content | Where-Object { $_.Trim().Length -gt 0 }).Count
  $total += $lines
  '{0}: {1:N0}' -f $group.Key, $lines
}
'Total nonblank lines: {0:N0}' -f $total
