# Caminho base do projeto
$basePath = "$PSScriptRoot\k8s"

Write-Host "`n🚀 Iniciando o Minikube..." -ForegroundColor Cyan
minikube start --driver=docker

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Falha ao iniciar o Minikube." -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ Aplicando MySQL..." -ForegroundColor Green
kubectl apply -f "$basePath\mysql-deployment.yaml"

Write-Host "`n✅ Aplicando Backend..." -ForegroundColor Green
kubectl apply -f "$basePath\backend-deployment.yaml"

Write-Host "`n✅ Aplicando Frontend..." -ForegroundColor Green
kubectl apply -f "$basePath\frontend-deployment.yaml"

Write-Host "`n🌐 Abrindo serviço frontend..." -ForegroundColor Cyan
minikube service portal-frontend
