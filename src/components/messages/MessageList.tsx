import type { Message, LoadState } from "../../dummyData/types";
import { FiChevronLeft, FiChevronRight, FiMoreVertical } from "react-icons/fi";

type Props = {
  messages: Message[];
  loadState: LoadState;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onSelect: (id: number) => void;
  selectedId?: number;
};

export default function MessageList({
  messages,
  loadState,
  containerRef,
  onSelect,
  selectedId,
}: Props) {
  const formatDate = (timestamp: number) =>
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
    }).format(new Date(timestamp));

  const subjectPreview = (text: string, max = 28) => {
    if (text.length <= max) return text;
    return `${text.slice(0, max)}...`;
  };

  return (
    <div className="flex min-h-[260px] flex-1 flex-col gap-0 overflow-hidden bg-white">
      <div className="grid grid-cols-[32px_1.6fr_1.4fr_2fr_1fr_52px] gap-x-4 items-center border-b border-slate-200 bg-sky-700 px-4 py-2 text-xs font-semibold uppercase text-white">
        <div className="flex items-center justify-center">
          <input type="checkbox" className="h-4 w-4 accent-sky-100" />
        </div>
        <div>From</div>
        <div>Recipients</div>
        <div>Subject</div>
        <div>Date</div>
        <div className="text-right">Action</div>
      </div>

      <div
        ref={containerRef}
        className="flex flex-1 flex-col overflow-y-auto"
      >
      {loadState === "loading" && (
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-sky-500" />
            <span>Fetching your messages…</span>
          </div>
        </div>
      )}

      {loadState === "error" && (
        <div className="flex flex-1 items-center justify-center py-10">
          <p className="text-sm text-red-600">
            Something went wrong while loading messages. Please refresh the
            page.
          </p>
        </div>
      )}

      {loadState !== "loading" &&
        loadState !== "error" &&
        messages.length === 0 && (
          <div className="flex flex-1 items-center justify-center py-10">
            <p className="text-sm text-slate-500">
              No messages yet. Start the conversation below.
            </p>
          </div>
        )}

      {loadState !== "loading" &&
        loadState !== "error" &&
        messages.map((message) => (
          <div
            key={message.id}
            onClick={() => onSelect(message.id)}
            className={`grid cursor-pointer grid-cols-[32px_1.6fr_1.4fr_2fr_1fr_52px] gap-x-4 items-center border-b border-slate-200 px-4 py-3 text-sm hover:bg-slate-50 ${
              selectedId === message.id ? "bg-sky-50" : ""
            }`}
          >
            <div className="flex items-center justify-center">
              <input
                type="checkbox"
                className="h-4 w-4 accent-sky-600"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="font-semibold text-slate-800">{message.author}</div>
            <div className="text-sky-700">{message.recipients}</div>
            <div className="truncate text-slate-800">
              {subjectPreview(message.content)}
            </div>
            <div className="text-slate-700">{formatDate(message.createdAt)}</div>
            <div className="flex justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(message.id);
                }}
                className="rounded p-1 text-slate-500 hover:bg-slate-100"
                aria-label="More actions"
              >
                <FiMoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3 text-xs text-slate-600">
        <span className="font-bold">Total {messages.length}</span>
        <div className="flex items-center gap-2">
          <button className="rounded border border-slate-200 px-2 py-1">
            3 items
          </button>
          <div className="flex items-center gap-1">
            <button className="rounded border border-slate-200 bg-slate-100 px-1 py-1">
            <FiChevronLeft className="h-4 w-4" />
            </button>
            <button className="rounded border border-slate-200 px-2 py-1">
              1
            </button>
            <button className="rounded border border-slate-200 px-2 py-1">
              2
            </button>
            <button className="rounded border border-slate-200 px-2 py-1">
              3
            </button>
            <button className="rounded border border-slate-200 bg-slate-100 px-1 py-1">
            <FiChevronRight className="h-4 w-4 text-slate-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
