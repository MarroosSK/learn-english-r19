import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useOptimistic, useActionState } from "react";
import { makeComment } from "../api/api-calls";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { ArticleI } from "../types/types";
import { toast } from "sonner";
import { Loader } from "lucide-react";

interface CommentFormI {
  article: ArticleI;
  refetchArticle: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Error>>;
}

const CommentForm = ({ article, refetchArticle }: CommentFormI) => {
  const { isSignedIn, user } = useUser();
  const [commentBody, setCommentBody] = useState("");

  const [optimisticComment, setOptimisticComment] = useOptimistic(
    commentBody,
    (current) => current
  );

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [state = { error: "" }, formAction, isPending] = useActionState(
    async () => {
      setOptimisticComment(commentBody);

      try {
        await makeComment(article.id, user?.id as string, commentBody);
        setCommentBody("");
        toast("Comment added!");
        await refetchArticle();
        return {};
      } catch (error) {
        return { error: "Failed to post comment. Please try again." };
      }
    },
    { error: "" }
  );

  return (
    <>
      {isSignedIn ? (
        <form
          action={formAction}
          className="w-full flex flex-col gap-y-4"
          data-id="comment-form"
        >
          <textarea
            name="body"
            placeholder="What is on your mind..."
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            required
            className="text-sm p-4 border rounded-lg w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-id="comment-textarea"
          />

          {isPending && (
            <p className="text-gray-500 flex items-center gap-x-1">
              {optimisticComment} <Loader className="animate-spin w-4 h-4" />
            </p>
          )}

          <button
            type="submit"
            className="self-end"
            data-id="comment-submit-button"
          >
            {isPending ? "Sending..." : "Send"}
          </button>
        </form>
      ) : (
        <p className="text-base " data-id="comment-signin-message">
          Please sign in to comment.
        </p>
      )}
    </>
  );
};

export default CommentForm;
