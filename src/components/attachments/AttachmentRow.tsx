import type { AttachmentFile } from "../../types/attachment";
import FileIcon from "./FileIcon";
import { formatFileSize } from "../../utils/fileSize";
import { formatFileType } from "../../utils/fileType";

type Props = {
  attachment: AttachmentFile;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onDownload: (id: number) => void;
};

export default function AttachmentRow({
  attachment,
  isSelected,
  onSelect,
  onDownload,
}: Props) {
  return (
    <tr
      className={`cursor-pointer border-b border-slate-200 transition-colors ${
        isSelected
          ? "bg-sky-50 hover:bg-sky-100"
          : "bg-white hover:bg-slate-50"
      }`}
      onClick={() => onSelect(attachment.id)}
    >
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(attachment.id)}
          onClick={(e) => e.stopPropagation()}
          className="h-4 w-4 cursor-pointer rounded border-slate-300 text-sky-600 focus:ring-2 focus:ring-sky-500"
        />
      </td>
      <td className="px-4 py-3">
        <FileIcon type={attachment.type} />
      </td>
      <td className="px-4 py-3 text-sm text-slate-800">{attachment.name}</td>
      <td className="px-4 py-3 text-sm text-slate-600 uppercase">
        {formatFileType(attachment.type, attachment.name)}
      </td>
      <td className="px-4 py-3 text-sm text-slate-600">
        {formatFileSize(attachment.size)}
      </td>
      <td className="px-4 py-3 text-sm text-slate-600">
        {attachment.date.toLocaleDateString()}
      </td>
    </tr>
  );
}
