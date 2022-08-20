import { v4 as uuid } from 'uuid';

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: (error: Error, name: string) => void,
) => {
  if (!file) return cb(new Error('File es empty'), '');

  const extension = file.mimetype.split('/')[1];

  const name = `${uuid()}.${extension}`;

  cb(null, name);
};
