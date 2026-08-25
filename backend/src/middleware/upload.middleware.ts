import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import { BadRequestError } from '../utils/errors';
import config from '../config';
import fs from 'fs';

const uploadDir = path.resolve(config.uploadPath);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    const dateFolder = new Date().toISOString().split('T')[0];
    const destPath = path.join(uploadDir, dateFolder);
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }
    cb(null, destPath);
  },
  filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueId = uuidv4();
    const ext = path.extname(file.originalname).toLowerCase();
    const sanitizedOriginalName = file.originalname
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .substring(0, 50);
    cb(null, `${uniqueId}-${sanitizedOriginalName}`);
  },
});

const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

const allowedExtensions = [
  '.jpg', '.jpeg', '.png', '.gif', '.webp',
  '.pdf', '.doc', '.docx', '.txt',
];

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mimeTypeAllowed = allowedMimeTypes.includes(file.mimetype);
  const extAllowed = allowedExtensions.includes(ext);

  if (mimeTypeAllowed && extAllowed) {
    cb(null, true);
  } else {
    cb(new BadRequestError(
      `File type not allowed. Allowed types: ${allowedExtensions.join(', ')}. ` +
      `Received: ${ext} (${file.mimetype})`
    ));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: config.maxFileSize,
    files: 5,
    fields: 20,
  },
});

export const uploadSingle = upload.single('file');
export const uploadMultiple = upload.array('files', 5);
export const uploadProfileImage = upload.single('profileImage');

export const memoryUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: config.maxFileSize,
    files: 1,
  },
});

export const validateFileExists = (req: Request): void => {
  if (!req.file) {
    throw new BadRequestError('No file uploaded');
  }
};

export const getFileUrl = (filename: string, dateFolder: string): string => {
  return `/uploads/${dateFolder}/${filename}`;
};

export const deleteFile = (filePath: string): void => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error(`Error deleting file: ${filePath}`, error);
  }
};

export default upload;
