import * as path from 'path';
import { diskStorage } from 'multer';
import * as mime from 'mime';
import { v4 as uuid } from 'uuid';

export function storageDir() {
  return path.join(__dirname, '../../storage');
}

export function multerStorage(dest: string) {
  return diskStorage({
    destination: (_req, _file, cb) => cb(null, dest),
    filename: (_req, file, cb) =>
      cb(null, `${uuid()}.${(mime as any).extensions[file.mimetype]}`),
  });
}
