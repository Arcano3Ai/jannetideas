#!/usr/bin/env bg

# Momentum Deployment Script for Google Cloud Run
# Ensure gcloud CLI is authenticated and target project is configured before executing.

set -e

PROJECT_ID=$(gcloud config get-value project)
REGION="us-central1"
SERVICE_NAME="momentum-app"
SERVICE_ACCOUNT_NAME="momentum-sa"

echo "=== Desplegando Momentum en Google Cloud Run ==="
echo "GCP Project: $PROJECT_ID"
echo "Region: $REGION"

# 1. Crear Service Account si no existe
echo "1. Configurando Service Account y Roles IAM mínimos..."
gcloud iam service-accounts create $SERVICE_ACCOUNT_NAME \
    --display-name="Service Account para Momentum App" || true

# Asignar roles IAM necesarios: roles/run.invoker y roles/storage.objectAdmin
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
    --role="roles/run.invoker"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
    --role="roles/storage.objectAdmin"

# 2. Compilar Imagen Docker con Google Cloud Build
echo "2. Compilando e Impulsando la Imagen en Container Registry / Artifact Registry..."
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME:latest .

# 3. Desplegar en Cloud Run
echo "3. Desplegando Servicio en Google Cloud Run..."
gcloud run deploy $SERVICE_NAME \
    --image gcr.io/$PROJECT_ID/$SERVICE_NAME:latest \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --service-account="${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
    --set-env-vars NODE_ENV="production",NEXT_PUBLIC_APP_URL="https://${SERVICE_NAME}-${PROJECT_ID}.${REGION}.run.app" \
    --memory 1Gi \
    --cpu 1 \
    --port 8080

echo "=== ¡Despliegue completado con éxito! ==="
