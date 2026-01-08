import { useMemo, useState } from "react";
import {
  INITIAL_DISCUSSION,
  type DiscussionComment,
  type Reply,
} from "../dummyData/discussion";
import CommentCard from "../components/discussion/CommentCard";

export default function DiscussionPage() {
  const [comments, setComments] = useState<DiscussionComment[]>(
    () => INITIAL_DISCUSSION,
  );
  const [replyDrafts, setReplyDrafts] = useState<
    Record<number, string | undefined>
  >({});
  const [commentDrafts, setCommentDrafts] = useState<
    Record<number, string | undefined>
  >({});

  const sortedComments = useMemo(
    () => [...comments].sort((a, b) => a.createdAt - b.createdAt),
    [comments],
  );

  const handleChangeDraft = (replyId: number, value: string) => {
    setReplyDrafts((prev) => ({ ...prev, [replyId]: value }));
  };

  const handleAddReply = (commentId: number, replyId: number | null) => {
    if (replyId === null) {
      const draft = commentDrafts[commentId]?.trim();
      if (!draft) return;

      setComments((prev) =>
        prev.map((comment) => {
          if (comment.id !== commentId) return comment;

          const newReply: Reply = {
            id: Date.now(),
            author: "You",
            content: draft,
            createdAt: Date.now(),
            replies: [],
          };

          return {
            ...comment,
            replies: [...comment.replies, newReply],
          };
        }),
      );

      setCommentDrafts((prev) => {
        const next = { ...prev };
        delete next[commentId];
        return next;
      });
      return;
    }

    const draft = replyDrafts[replyId]?.trim();
    if (!draft) return;

    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id !== commentId) return comment;

        const newReply: Reply = {
          id: Date.now(),
          author: "You",
          content: draft,
          createdAt: Date.now(),
          replies: [],
        };

        const addReplyToReplies = (replies: Reply[]): Reply[] => {
          return replies.map((reply) => {
            if (reply.id === replyId) {
              return {
                ...reply,
                replies: [...reply.replies, newReply],
              };
            }
            return {
              ...reply,
              replies: addReplyToReplies(reply.replies),
            };
          });
        };

        return {
          ...comment,
          replies: addReplyToReplies(comment.replies),
        };
      }),
    );

    setReplyDrafts((prev) => {
      const next = { ...prev };
      delete next[replyId];
      return next;
    });
  };

  const handleDismissReply = (replyId: number) => {
    setReplyDrafts((prev) => {
      const next = { ...prev };
      delete next[replyId];
      return next;
    });
  };

  const ensureDraftExists = (replyId: number) => {
    setReplyDrafts((prev) =>
      prev[replyId] === undefined ? { ...prev, [replyId]: "" } : prev,
    );
  };

  const handleChangeCommentDraft = (commentId: number, value: string) => {
    setCommentDrafts((prev) => ({ ...prev, [commentId]: value }));
  };

  const handleDismissCommentDraft = (commentId: number) => {
    setCommentDrafts((prev) => {
      const next = { ...prev };
      delete next[commentId];
      return next;
    });
  };

  return (
    <div className="rounded-xl bg-white p-0 shadow text-left">
      <div className="border-b border-slate-200 bg-lime-100 px-4 py-2 text-center text-sm font-semibold text-slate-800">
        Main content
      </div>

      <div className="flex flex-col gap-4 px-4 py-4">
        {sortedComments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            replyDrafts={replyDrafts}
            commentDraft={commentDrafts[comment.id]}
            onOpenReply={ensureDraftExists}
            onChangeDraft={handleChangeDraft}
            onAddReply={handleAddReply}
            onDismiss={handleDismissReply}
            onChangeCommentDraft={handleChangeCommentDraft}
            onDismissCommentDraft={handleDismissCommentDraft}
          />
        ))}
      </div>
    </div>
  );
}
