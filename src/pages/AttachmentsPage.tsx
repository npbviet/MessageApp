import { useState, useCallback } from "react";
import type { AttachmentFile } from "../types/attachment";
import AttachmentsTable from "../components/attachments/AttachmentsTable";
import UploadBox from "../components/attachments/UploadBox";
import { MOCK_ATTACHMENTS } from "../dummyData/attachments";

export default function AttachmentsPage() {
  const [attachments, setAttachments] = useState<AttachmentFile[]>(MOCK_ATTACHMENTS);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const handleSelect = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedIds.size === attachments.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(attachments.map((a) => a.id)));
    }
  }, [attachments, selectedIds.size]);

  const handleDownload = useCallback((id: number) => {
    const attachment = attachments.find((a) => a.id === id);
    if (attachment) {
      console.log(`Downloading: ${attachment.name}`);
      alert(`Mock download: ${attachment.name}`);
    }
  }, [attachments]);

  const handleDownloadAll = useCallback(() => {
    if (attachments.length === 0) {
      alert("No files to download");
      return;
    }
    console.log("Downloading all files");
    alert(`Mock download: ${attachments.length} files`);
  }, [attachments]);

  const handleActivityHistory = useCallback(() => {
    console.log("Opening activity history");
    alert("Activity History - This would show file activity log");
  }, []);

  const handleMove = useCallback(() => {
    if (selectedIds.size === 0) {
      alert("Please select files to move");
      return;
    }
    console.log("Moving files:", Array.from(selectedIds));
    alert(`Mock move: ${selectedIds.size} file(s)`);
  }, [selectedIds]);

  const handleCopy = useCallback(() => {
    if (selectedIds.size === 0) {
      alert("Please select files to copy");
      return;
    }
    console.log("Copying files:", Array.from(selectedIds));
    alert(`Mock copy: ${selectedIds.size} file(s)`);
  }, [selectedIds]);

  const handleDelete = useCallback(() => {
    if (selectedIds.size === 0) {
      alert("Please select files to delete");
      return;
    }

    if (
      confirm(
        `Are you sure you want to delete ${selectedIds.size} file(s)?`
      )
    ) {
      setAttachments((prev) =>
        prev.filter((a) => !selectedIds.has(a.id))
      );
      setSelectedIds(new Set());
    }
  }, [selectedIds]);

  const handleUpload = useCallback((files: File[]) => {
    setAttachments((prev) => {
      const existingKeys = new Set(prev.map((a) => `${a.name}-${a.size}`));
      const newFiles = files.filter(
        (file) => !existingKeys.has(`${file.name}-${file.size}`)
      );

      if (newFiles.length === 0) {
        return prev; 
      }

      const maxId = prev.length > 0 ? Math.max(...prev.map((a) => a.id)) : 0;
      
      const newAttachments: AttachmentFile[] = newFiles.map((file, index) => ({
        id: maxId + index + 1,
        name: file.name,
        type: file.type || "application/octet-stream",
        size: file.size,
        date: new Date(),
      }));

      return [...prev, ...newAttachments];
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <AttachmentsTable
          attachments={attachments}
          selectedIds={selectedIds}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
          onDownload={handleDownload}
          selectedCount={selectedIds.size}
          onActivityHistory={handleActivityHistory}
          onDownloadAll={handleDownloadAll}
          onMove={handleMove}
          onCopy={handleCopy}
          onDelete={handleDelete}
        />

        <UploadBox
          onUpload={handleUpload}
          config={{
            maxSize: 10 * 1024 * 1024,
            allowedTypes: [],
          }}
        />
      </div>
    </div>
  );
}
