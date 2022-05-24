export interface MulterDiskUploadedFiles {
  [fieldName: string]:
    | {
        filename: string;
        size: number;
        mimetype: string;
        originalName: string;
        fieldName: string;
        encoding: string;
      }[]
    | undefined;
}
