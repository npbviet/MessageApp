import { FiTrash2 } from "react-icons/fi";
import type { Reply } from "../../dummyData/discussion";
import { formatRelative } from "../../utils/time";
import ReplyEditor from "./ReplyEditor";

type Props = {
  reply: Reply;
  draft: string | undefined;
  onOpenReply: (replyId: number) => void;
  onChangeDraft: (replyId: number, value: string) => void;
  onAddReply: (replyId: number) => void;
  onDismiss: (replyId: number) => void;
  replyDrafts: Record<number, string | undefined>;
  commentId: number;
  depth?: number;
};

export default function ReplyItem({
  reply,
  draft,
  onOpenReply,
  onChangeDraft,
  onAddReply,
  onDismiss,
  replyDrafts,
  commentId,
  depth = 0,
}: Props) {
  const isReplyOpen = draft !== undefined;

  return (
    <div className={`flex flex-col gap-2 ${depth > 0 ? "pl-12" : ""}`}>
      <div className="flex flex-col gap-2 p-3">
        <div className="flex gap-3">
          <div className="flex items-start pt-1">
            <div className="h-10 w-10 rounded-full bg-sky-700" />
          </div>
          <div className="flex flex-col gap-1 rounded-md bg-slate-50 p-3 text-sm text-slate-800 flex-1">
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold">{reply.author}</span>
              <div className="flex items-stretch overflow-hidden text-sm text-slate-500">
                <span className="px-2 py-1 text-xs text-slate-500">
                  {formatRelative(reply.createdAt)}
                </span>
                <button
                  type="button"
                  className="px-2 py-1 text-xs border-l border-slate-200 hover:bg-slate-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  aria-label="Delete"
                  className="flex items-center px-2 py-1 border-l border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-red-600"
                >
                  <FiTrash2 className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>
            <p className="leading-relaxed">{reply.content}</p>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
              <button
                type="button"
                className="font-semibold text-sky-700 hover:underline"
                onClick={() => onOpenReply(reply.id)}
              >
                Reply
              </button>
            </div>
          </div>
        </div>

        {isReplyOpen && (
          <div className="pl-12">
            <ReplyEditor
              value={draft ?? ""}
              onChange={(value) => onChangeDraft(reply.id, value)}
              onDismiss={() => onDismiss(reply.id)}
              onSave={() => onAddReply(reply.id)}
            />
          </div>
        )}
      </div>

      {reply.replies.length > 0 && (
        <div className="flex flex-col gap-2">
          {reply.replies.map((nestedReply) => (
            <ReplyItem
              key={nestedReply.id}
              reply={nestedReply}
              draft={replyDrafts[nestedReply.id]}
              onOpenReply={onOpenReply}
              onChangeDraft={onChangeDraft}
              onAddReply={onAddReply}
              onDismiss={onDismiss}
              replyDrafts={replyDrafts}
              commentId={commentId}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

