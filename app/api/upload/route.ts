import { NextResponse } from 'next/server';
import { saveUploadedFile } from '@/lib/storage';
import { logger } from '@/lib/logger';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No se ha adjuntado ningún archivo.' }, { status: 400 });
    }

    const url = await saveUploadedFile(file);
    logger.info('File uploaded successfully', { fileName: file.name, url });

    return NextResponse.json({ success: true, url });
  } catch (error) {
    logger.error('Error handling upload', error);
    return NextResponse.json({ error: 'Error al subir el archivo.' }, { status: 500 });
  }
}
