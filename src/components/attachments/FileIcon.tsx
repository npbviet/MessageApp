import { 
  FiFileText, 
  FiImage, 
  FiVideo, 
  FiMusic,
  FiArchive,
  FiFile as FiFileGeneric
} from "react-icons/fi";

type Props = {
  type: string;
  className?: string;
};

export default function FileIcon({ type, className = "h-5 w-5" }: Props) {
  const normalizedType = type.toLowerCase();
  
  // Image types
  if (normalizedType.startsWith("image/")) {
    return <FiImage className={`${className} text-blue-500`} />;
  }
  
  // Video types
  if (normalizedType.startsWith("video/")) {
    return <FiVideo className={`${className} text-purple-500`} />;
  }
  
  // Audio types
  if (normalizedType.startsWith("audio/")) {
    return <FiMusic className={`${className} text-green-500`} />;
  }
  
  // Archive types
  if (
    normalizedType.includes("zip") ||
    normalizedType.includes("rar") ||
    normalizedType.includes("tar") ||
    normalizedType.includes("gz")
  ) {
    return <FiArchive className={`${className} text-orange-500`} />;
  }
  
  // PDF
  if (normalizedType === "application/pdf" || normalizedType === "pdf") {
    return <FiFileText className={`${className} text-red-500`} />;
  }
  
  // Text documents
  if (
    normalizedType.includes("text") ||
    normalizedType.includes("document") ||
    normalizedType.includes("word") ||
    normalizedType.includes("excel") ||
    normalizedType.includes("powerpoint")
  ) {
    return <FiFileText className={`${className} text-slate-600`} />;
  }
  
  // Default
  return <FiFileGeneric className={`${className} text-slate-400`} />;
}
