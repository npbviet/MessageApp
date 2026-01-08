import { useMemo, Fragment } from "react";
import type { AttachmentFile } from "../../types/attachment";
import AttachmentRow from "./AttachmentRow";
import ActionsMenu from "./ActionsMenu";

type Props = {
  attachments: AttachmentFile[];
  selectedIds: Set<number>;
  onSelect: (id: number) => void;
  onSelectAll: () => void;
  selectedCount: number;
  onActivityHistory: () => void;
  onDownloadAll: () => void;
  onMove: () => void;
  onCopy: () => void;
  onDelete: () => void;
};

export default function AttachmentsTable({
  attachments,
  selectedIds,
  onSelect,
  onSelectAll,
  selectedCount,
  onActivityHistory,
  onDownloadAll,
  onMove,
  onCopy,
  onDelete,
}: Props) {
  const allSelected = useMemo(
    () => attachments.length > 0 && selectedIds.size === attachments.length,
    [attachments.length, selectedIds.size]
  );

  const groupedAttachments = useMemo(() => {
    const groups: { path?: string; files: AttachmentFile[] }[] = [];
    const pathMap = new Map<string, AttachmentFile[]>();

    attachments.forEach((file) => {
      if (file.path) {
        if (!pathMap.has(file.path)) {
          pathMap.set(file.path, []);
        }
        pathMap.get(file.path)!.push(file);
      } else {
        if (groups.length === 0 || groups[groups.length - 1].path !== undefined) {
          groups.push({ files: [] });
        }
        groups[groups.length - 1].files.push(file);
      }
    });

    pathMap.forEach((files, path) => {
      groups.push({ path, files });
    });

    return groups;
  }, [attachments]);

  if (attachments.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-500">No attachments found</p>
        <p className="mt-1 text-sm text-slate-400">
          Upload files using the upload box below
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">
            Attachments{" "}
            <span className="text-sm font-normal text-slate-500">
              ({attachments.length} {attachments.length === 1 ? "file" : "files"})
            </span>
          </h2>
          <ActionsMenu
            selectedCount={selectedCount}
            onActivityHistory={onActivityHistory}
            onDownloadAll={onDownloadAll}
            onMove={onMove}
            onCopy={onCopy}
            onDelete={onDelete}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-sky-50">
            <tr className="border-b border-slate-200">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onSelectAll}
                  className="h-4 w-4 cursor-pointer rounded border-slate-300 text-sky-600 focus:ring-2 focus:ring-sky-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Icon
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Size
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {groupedAttachments.map((group, groupIndex) => (
              <Fragment key={`group-${groupIndex}`}>
                {group.path && (
                  <tr className="bg-green-50">
                    <td colSpan={6} className="px-4 py-2 text-xs font-medium text-slate-600">
                      {group.path}
                    </td>
                  </tr>
                )}
                {group.files.map((file) => (
                  <AttachmentRow
                    key={file.id}
                    attachment={file}
                    isSelected={selectedIds.has(file.id)}
                    onSelect={onSelect}
                  />
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
