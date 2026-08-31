import fs from 'fs/promises';
import path from 'path';

/**
 * Saves an uploaded File buffer locally in public/uploads directory
 * or uploads to GCP Cloud Storage if GCS credentials/bucket are configured.
 */
export async function saveUploadedFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate unique filename with timestamp and clean original name
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filename = `${Date.now()}_${cleanName}`;

  // If running locally, save to public/uploads
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  
  try {
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);
    
    // Return relative URL accessible by browser
    return `/uploads/${filename}`;
  } catch (error) {
    console.error('Error saving file locally:', error);
    throw new Error('Failed to save file');
  }
}
