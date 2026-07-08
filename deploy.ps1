# UTF-8 encoding support
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "             Vercel 포트폴리오 자동 배포             " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# .env 파일에서 토큰 로드 및 세션 Path 임시 보강
$env:Path += ";C:\Program Files\nodejs\"
if (Test-Path ".env") {
    Get-Content ".env" | ForEach-Object {
        if ($_ -match "VERCEL_TOKEN=(.+)") {
            $env:VERCEL_TOKEN = $Matches[1].Trim()
        }
    }
}

Write-Host "[안내] Vercel 배포를 시작합니다..." -ForegroundColor Yellow
Write-Host ""

# Vercel 배포 명령 실행
try {
    $deployProcess = Start-Process npx -ArgumentList "vercel --prod --yes" -NoNewWindow -PassThru -Wait
    
    if ($deployProcess.ExitCode -eq 0) {
        Write-Host ""
        Write-Host "==================================================" -ForegroundColor Green
        Write-Host "🎉 Vercel 프로덕션 자동 배포가 완료되었습니다!" -ForegroundColor Green
        Write-Host "인터넷 사이트 (https://bklimpf-portfolio.vercel.app/) 에서" -ForegroundColor Green
        Write-Host "수정 사항이 반영되었는지 새로고침(Ctrl + F5)하여 확인해보세요." -ForegroundColor Green
        Write-Host "==================================================" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "[경고] 배포 프로세스가 정상 종료되지 않았습니다. (종료 코드: $($deployProcess.ExitCode))" -ForegroundColor Yellow
        Write-Host "최초 1회 인증이 되지 않았거나 Vercel 연동이 끊어졌을 수 있습니다." -ForegroundColor Yellow
        Write-Host "터미널에서 'npx vercel login'을 입력하여 로그인을 완료한 후 다시 시도해보세요." -ForegroundColor Cyan
    }
}
catch {
    Write-Host ""
    Write-Host "[오류] 배포 명령 실행 도중 예외가 발생했습니다." -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Yellow
}
