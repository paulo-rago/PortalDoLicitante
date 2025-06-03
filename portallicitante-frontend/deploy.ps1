# Set variables
$IMAGE_NAME="paulorago/portal-frontend"
$IMAGE_TAG="latest"

Write-Host "`n🏗️ Building frontend Docker image..." -ForegroundColor Cyan
docker build -t "${IMAGE_NAME}:${IMAGE_TAG}" .

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to build Docker image." -ForegroundColor Red
    exit 1
}

Write-Host "`n📦 Loading image into Minikube..." -ForegroundColor Cyan
minikube image load "${IMAGE_NAME}:${IMAGE_TAG}"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to load image into Minikube." -ForegroundColor Red
    exit 1
}

Write-Host "`n🚀 Deploying to Kubernetes..." -ForegroundColor Cyan
kubectl apply -f ../k8s/frontend-deployment.yaml

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to deploy to Kubernetes." -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ Deployment completed successfully!" -ForegroundColor Green
Write-Host "To access the application, run: minikube service portal-frontend" -ForegroundColor Yellow 