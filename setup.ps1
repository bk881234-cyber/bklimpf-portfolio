# UTF-8 encoding support
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   포트폴리오 터미널 개발 환경 자동 설정 스크립트   " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Winget 존재 확인
$wingetCheck = Get-Command winget -ErrorAction SilentlyContinue
if (-not $wingetCheck) {
    Write-Host "[오류] Windows Package Manager (winget)을 찾을 수 없습니다." -ForegroundColor Red
    Write-Host "Windows 10/11 최신 업데이트 상태를 확인하거나 Microsoft Store에서 '앱 설치 관리자'를 설치해주세요." -ForegroundColor Yellow
    Exit
}

# 2. Git 설치 체크
$gitCheck = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitCheck) {
    Write-Host "[안내] Git이 설치되어 있지 않습니다. Git 설치를 시작합니다..." -ForegroundColor Yellow
    Start-Process winget -ArgumentList "install --id Git.Git -e --silent --accept-source-agreements --accept-package-agreements" -NoNewWindow -Wait
    Write-Host "[성공] Git 설치 명령이 완료되었습니다." -ForegroundColor Green
} else {
    Write-Host "[확인] Git이 이미 설치되어 있습니다." -ForegroundColor Green
}

# 3. Node.js 설치 체크
$nodeCheck = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCheck) {
    Write-Host "[안내] Node.js가 설치되어 있지 않습니다. Node.js(LTS) 설치를 시작합니다..." -ForegroundColor Yellow
    Start-Process winget -ArgumentList "install --id OpenJS.NodeJS.LTS -e --silent --accept-source-agreements --accept-package-agreements" -NoNewWindow -Wait
    Write-Host "[성공] Node.js 설치 명령이 완료되었습니다." -ForegroundColor Green
} else {
    Write-Host "[확인] Node.js가 이미 설치되어 있습니다." -ForegroundColor Green
}

Write-Host ""
Write-Host "--------------------------------------------------" -ForegroundColor Cyan
Write-Host "설치가 모두 완료되었거나 이미 존재합니다." -ForegroundColor Green
Write-Host "새로 설치된 도구를 인식하려면 [현재 터미널 창을 완전히 닫고 다시 실행]해야 합니다." -ForegroundColor Yellow
Write-Host "--------------------------------------------------" -ForegroundColor Cyan
