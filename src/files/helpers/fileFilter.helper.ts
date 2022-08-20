export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: (error: Error, acceptFile: boolean) => void,
) => {
  if (!file) return cb(new Error('File es empty'), false);

  const extension = file.mimetype.split('/')[1];
  const validExtensions: string[] = ['jpg', 'jpeg', 'png'];

  if (validExtensions.includes(extension)) {
    return cb(null, true);
  }

  cb(null, false);
};
