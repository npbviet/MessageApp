/**
 * Format file MIME type to a short, readable format
 */
export function formatFileType(mimeType: string, fileName?: string): string {
  if (!mimeType || mimeType === "application/octet-stream") {
    // Try to infer from file extension if MIME type is unknown
    if (fileName) {
      const extension = fileName.split(".").pop()?.toUpperCase();
      if (extension) {
        return extension;
      }
    }
    return "FILE";
  }

  // Common file types mapping
  const typeMap: Record<string, string> = {
    // PDF
    "application/pdf": "PDF",
    
    // Microsoft Office - Word
    "application/msword": "DOC",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX",
    
    // Microsoft Office - Excel
    "application/vnd.ms-excel": "XLS",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX",
    
    // Microsoft Office - PowerPoint
    "application/vnd.ms-powerpoint": "PPT",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": "PPTX",
    
    // Images
    "image/jpeg": "JPG",
    "image/jpg": "JPG",
    "image/png": "PNG",
    "image/gif": "GIF",
    "image/webp": "WEBP",
    "image/svg+xml": "SVG",
    
    // Text
    "text/plain": "TXT",
    "text/html": "HTML",
    "text/css": "CSS",
    "text/javascript": "JS",
    "application/javascript": "JS",
    
    // Archives
    "application/zip": "ZIP",
    "application/x-rar-compressed": "RAR",
    "application/x-tar": "TAR",
    "application/gzip": "GZIP",
    
    // Video
    "video/mp4": "MP4",
    "video/mpeg": "MPEG",
    "video/quicktime": "MOV",
    "video/x-msvideo": "AVI",
    
    // Audio
    "audio/mpeg": "MP3",
    "audio/wav": "WAV",
    "audio/ogg": "OGG",
  };

  // Check if we have a direct mapping
  if (typeMap[mimeType]) {
    return typeMap[mimeType];
  }

  // For Office documents with long MIME types, extract the key part
  if (mimeType.includes("officedocument")) {
    if (mimeType.includes("wordprocessingml")) return "DOCX";
    if (mimeType.includes("spreadsheetml")) return "XLSX";
    if (mimeType.includes("presentationml")) return "PPTX";
  }

  // Try to extract from MIME type structure (type/subtype)
  const parts = mimeType.split("/");
  if (parts.length === 2) {
    const subtype = parts[1];
    
    // For complex subtypes, try to extract meaningful part
    if (subtype.includes(".")) {
      const lastPart = subtype.split(".").pop();
      if (lastPart && lastPart.length <= 5) {
        return lastPart.toUpperCase();
      }
    }
    
    // Return uppercase subtype if it's short enough
    if (subtype.length <= 10) {
      return subtype.toUpperCase();
    }
  }

  // Fallback: return the full MIME type
  return mimeType;
}
