import { useState, useRef } from "react";
import type { DragEvent, ChangeEvent } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import type { FileValidationError, FileUploadConfig } from "../../types/attachment";

type Props = {
  onUpload: (files: File[]) => void;
  config?: FileUploadConfig;
};

const DEFAULT_CONFIG: FileUploadConfig = {
  maxSize: 10 * 1024 * 1024, 
  allowedTypes: [], 
};

export default function UploadBox({
  onUpload,
  config = DEFAULT_CONFIG,
}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<FileValidationError[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): FileValidationError | null => {
    // Check file size
    if (file.size > config.maxSize) {
      return {
        fileName: file.name,
        error: "size",
        message: `File size exceeds ${(config.maxSize / (1024 * 1024)).toFixed(0)}MB`,
      };
    }

    // Check file type if restrictions are set
    if (config.allowedTypes.length > 0) {
      const isAllowed = config.allowedTypes.some((allowedType) => {
        if (allowedType.endsWith("/*")) {
          // Check main type (e.g., "image/*")
          return file.type.startsWith(allowedType.slice(0, -2));
        }
        return file.type === allowedType;
      });

      if (!isAllowed) {
        return {
          fileName: file.name,
          error: "type",
          message: `File type ${file.type} is not allowed`,
        };
      }
    }

    return null;
  };

  const processFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validationErrors: FileValidationError[] = [];
    const validFiles: File[] = [];

    fileArray.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        validationErrors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      // Clear errors after 5 seconds
      setTimeout(() => setErrors([]), 5000);
    }

    if (validFiles.length > 0) {
      onUpload(validFiles);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFiles(files);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mt-4">
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          isDragging
            ? "border-sky-500 bg-sky-50"
            : "border-slate-300 bg-slate-50 hover:border-sky-400 hover:bg-sky-50/50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
          accept={config.allowedTypes.join(",")}
        />

        <div className="flex flex-col items-center gap-2">
          <FiUpload
            className={`h-8 w-8 ${isDragging ? "text-sky-600" : "text-slate-400"}`}
          />
          <div className="text-sm font-medium text-slate-700">
            Drop files here
          </div>
          <div className="text-xs text-slate-500">- or -</div>
          <div className="text-sm text-slate-600">Click to browse for files</div>
          <div className="mt-2 text-xs text-slate-400">
            Max size: {(config.maxSize / (1024 * 1024)).toFixed(0)}MB
            {config.allowedTypes.length > 0 &&
              ` • Allowed: ${config.allowedTypes.join(", ")}`}
          </div>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-red-800">
                Upload Errors ({errors.length})
              </h4>
              <ul className="mt-1 list-disc list-inside space-y-1 text-xs text-red-700">
                {errors.map((error, index) => (
                  <li key={index}>
                    <span className="font-medium">{error.fileName}:</span>{" "}
                    {error.message}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setErrors([])}
              className="ml-2 text-red-600 hover:text-red-800"
              aria-label="Close errors"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
