import { useState, useRef, useEffect } from "react";
import { FiMoreVertical, FiClock, FiDownload, FiArrowRight, FiCopy, FiTrash2 } from "react-icons/fi";

type Props = {
  selectedCount: number;
  onActivityHistory: () => void;
  onDownloadAll: () => void;
  onMove: () => void;
  onCopy: () => void;
  onDelete: () => void;
};

export default function ActionsMenu({
  selectedCount,
  onActivityHistory,
  onDownloadAll,
  onMove,
  onCopy,
  onDelete,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const hasSelection = selectedCount > 0;

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
      >
        <span>Actions</span>
        <FiMoreVertical className="h-4 w-4" />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full z-50 mt-2 w-48 rounded-md border border-slate-200 bg-white shadow-lg"
        >
          <div className="py-1">
            <button
              onClick={() => {
                onActivityHistory();
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50"
            >
              <FiClock className="h-4 w-4" />
              <span>Activity History</span>
            </button>

            <button
              onClick={() => {
                onDownloadAll();
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50"
            >
              <FiDownload className="h-4 w-4" />
              <span>Download All</span>
            </button>

            <div className="my-1 border-t border-slate-200" />

            <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {hasSelection ? `--- selection (${selectedCount}) ---` : "--- selection ---"}
            </div>

            <button
              onClick={() => {
                if (hasSelection) {
                  onMove();
                  setIsOpen(false);
                }
              }}
              disabled={!hasSelection}
              className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors ${
                hasSelection
                  ? "text-slate-700 hover:bg-slate-50"
                  : "cursor-not-allowed text-slate-400"
              }`}
            >
              <FiArrowRight className="h-4 w-4" />
              <span>Move</span>
            </button>

            <button
              onClick={() => {
                if (hasSelection) {
                  onCopy();
                  setIsOpen(false);
                }
              }}
              disabled={!hasSelection}
              className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors ${
                hasSelection
                  ? "text-slate-700 hover:bg-slate-50"
                  : "cursor-not-allowed text-slate-400"
              }`}
            >
              <FiCopy className="h-4 w-4" />
              <span>Copy</span>
            </button>

            <button
              onClick={() => {
                if (hasSelection) {
                  onDelete();
                  setIsOpen(false);
                }
              }}
              disabled={!hasSelection}
              className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors ${
                hasSelection
                  ? "text-red-600 hover:bg-red-50"
                  : "cursor-not-allowed text-slate-400"
              }`}
            >
              <FiTrash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
