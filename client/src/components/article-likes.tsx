import { useOptimistic, useActionState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { Loader, ThumbsUp } from "lucide-react";
import { fetchLikes, switchLike } from "../api/api-calls";
import { cn } from "../lib/utils";

interface LikeI {
  id: number;
  createdAt: string;
  userId: string;
  articleId: string;
  commentId: string | null;
}
interface CurrentLikeI {
  id: number;
  userId: string;
  articleId: string;
}

interface ArticleLikesI {
  articleId: string;
  initialLikes: LikeI[];
}

const ArticleLikes = ({ articleId, initialLikes }: ArticleLikesI) => {
  const {
    data: likes,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["likes", articleId],
    queryFn: () => fetchLikes(articleId),
    initialData: initialLikes,
  });

  const { isSignedIn, user } = useUser();
  const isLiked = likes?.some((like: LikeI) => like.userId === user?.id);

  const [optimisticLikes, toggleOptimisticLikes] = useOptimistic(
    likes,
    (currentLikes) => {
      if (isLiked) {
        return currentLikes.filter(
          (like: CurrentLikeI) => like.userId !== user?.id
        );
      } else {
        return [
          ...currentLikes,
          { id: Date.now(), userId: user?.id as string, articleId },
        ];
      }
    }
  );

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [state, formAction, isPending] = useActionState<unknown>(async () => {
    toggleOptimisticLikes(likes);

    const data = {
      userId: user?.id as string,
      articleId: articleId,
    };

    try {
      await switchLike(data);
      await refetch();
      return {};
    } catch (error: unknown) {
      return error;
    }
  }, {});

  return (
    <div className="flex items-center gap-x-2">
      {isSignedIn ? (
        <form action={formAction} className="flex items-center gap-x-1">
          <button
            type="submit"
            className={cn(
              "p-2 rounded-md transition-all",
              isLiked ? "text-blue-500" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <ThumbsUp />
          </button>

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <span className="flex items-center gap-x-1">
              {isPending ? (
                <>
                  {optimisticLikes.length}{" "}
                  <Loader className="animate-spin w-4 h-4" />
                </>
              ) : (
                <>{likes.length}</>
              )}
            </span>
          )}
          {error && <p>Error!</p>}
        </form>
      ) : (
        <div className="flex items-center gap-x-1">
          <ThumbsUp className="text-gray-500" />
          <span>{likes.length}</span>
        </div>
      )}
    </div>
  );
};

export default ArticleLikes;
