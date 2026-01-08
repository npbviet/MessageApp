import type { DiscussionComment } from "../../dummyData/discussion";
import ReplyItem from "./ReplyItem";
import ReplyEditor from "./ReplyEditor";
import { FiTrash2 } from "react-icons/fi";

type Props = {
  comment: DiscussionComment;
  replyDrafts: Record<number, string | undefined>;
  commentDraft: string | undefined;
  onOpenReply: (replyId: number) => void;
  onChangeDraft: (replyId: number, value: string) => void;
  onAddReply: (commentId: number, replyId: number | null) => void;
  onDismiss: (replyId: number) => void;
  onChangeCommentDraft: (commentId: number, value: string) => void;
  onDismissCommentDraft: (commentId: number) => void;
};

export default function CommentCard({
  comment,
  replyDrafts,
  commentDraft,
  onOpenReply,
  onChangeDraft,
  onAddReply,
  onDismiss,
  onChangeCommentDraft,
  onDismissCommentDraft,
}: Props) {

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-sky-700" />
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex items-center justify-between gap-3 text-sm text-slate-800">
            <span className="font-semibold">{comment.author}</span>
            <div className="flex items-stretch overflow-hidden text-sm text-slate-500">
              <span className="px-2 py-1">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
              <button
                type="button"
                className="px-2 py-1 border-l border-slate-200 hover:bg-slate-50"
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
          <p className="text-sm text-slate-800 leading-relaxed">
            {comment.content}
          </p>
        </div>
      </div>

      {comment.replies.length > 0 && (
        <div className="flex flex-col gap-2 pl-12">
          {comment.replies.map((reply) => (
            <ReplyItem
              key={reply.id}
              reply={reply}
              draft={replyDrafts[reply.id]}
              onOpenReply={onOpenReply}
              onChangeDraft={onChangeDraft}
              onAddReply={(replyId) => onAddReply(comment.id, replyId)}
              onDismiss={onDismiss}
              replyDrafts={replyDrafts}
              commentId={comment.id}
              depth={0}
            />
          ))}
        </div>
      )}

      <ReplyEditor
        value={commentDraft ?? ""}
        onChange={(value) => onChangeCommentDraft(comment.id, value)}
        onDismiss={() => onDismissCommentDraft(comment.id)}
        onSave={() => onAddReply(comment.id, null)}
      />
    </div>
  );
}

