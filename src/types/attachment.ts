export type AttachmentFile = {
  id: number;
  name: string;
  type: string;
  size: number; 
  date: Date;
  path?: string; 
};

export type FileValidationError = {
  fileName: string;
  error: "size" | "type" | "unknown";
  message: string;
};

export type FileUploadConfig = {
  maxSize: number; 
  allowedTypes: string[]; 
};
