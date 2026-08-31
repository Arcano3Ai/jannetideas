# Guía de Despliegue en Producción: Plataforma Momentum

Esta guía detalla los pasos para desplegar la aplicación full-stack **Momentum** conservando todas sus capacidades de backend Node.js, APIs, almacenamiento de datos (Prisma) y carga multimedia.

---

## Opción 1: Despliegue Instantáneo en Vercel (Recomendado - 1 Clic)

Vercel es la plataforma nativa creada por el equipo de Next.js. Soporta al 100% las API routes, Server Actions y la compilación standalone.

### Pasos:
1. Ingresa a [vercel.com/new](https://vercel.com/new) e inicia sesión con tu cuenta de GitHub.
2. Selecciona e importa el repositorio **`Arcano3Ai/jannetideas`**.
3. En la configuración del proyecto:
   - **Framework Preset:** Next.js (se detecta automáticamente).
   - **Root Directory:** `./`
4. *(Opcional)* En la sección **Storage** de tu panel de Vercel, agrega una base de datos **Vercel Postgres** o Neon/Supabase y vincula la variable `DATABASE_URL`.
5. Haz clic en **Deploy**. ¡Tu plataforma estará activa en 1 minuto en una URL HTTPS pública (ej: `https://jannetideas.vercel.app`)!

---

## Opción 2: Despliegue en Google Cloud Run (Contenedor Docker)

Google Cloud Run ejecuta el contenedor Docker multietapa en una arquitectura Serverless escalable a cero.

### Requisitos Previos:
- Tener instalado y configurado el SDK de Google Cloud (`gcloud`).
- Un proyecto activo en GCP.

### Instrucciones:
1. Abre tu terminal o Google Cloud Shell en el directorio del proyecto.
2. Otorga permisos de ejecución al script de despliegue:
   ```bash
   chmod +x deploy-cloudrun.sh
   ```
3. Ejecuta el script de despliegue automático:
   ```bash
   ./deploy-cloudrun.sh
   ```

El script se encargará automáticamente de:
- Asignar los roles IAM mínimos necesarios (`roles/run.invoker` y `roles/storage.objectAdmin`).
- Compilar la imagen usando Google Cloud Build (`cloudbuild.yaml` / `Dockerfile`).
- Desplegar el servicio en Cloud Run en el puerto `8080` con soporte HTTPS.

---

## Variables de Entorno en Producción (`.env`)

- `DATABASE_URL`: Cadena de conexión a tu base de datos (PostgreSQL o SQLite).
- `NEXT_PUBLIC_APP_URL`: URL pública de tu aplicación desplegada (ej: `https://jannetideas.vercel.app`).
- `GCS_BUCKET_NAME`: (Opcional) Nombre del bucket de Google Cloud Storage para archivos subidos.
