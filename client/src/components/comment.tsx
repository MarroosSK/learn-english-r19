import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface CommentI {
  _count: {
    likes: number;
  };
  body: string;
  createdAt: string;
  user: {
    id: string;
    email: string;
    username: string;
    role: string;
  };
}

const Comment = ({ comment }: { comment: CommentI }) => {
  const timeAgo = dayjs(comment.createdAt).fromNow();

  const avatarFallback = comment.user.username.charAt(0).toUpperCase();

  return (
    <div className="p-4 mb-4 flex gap-4">
      <div className="w-10 h-10 bg-gray-300 text-gray-700 flex items-center justify-center font-bold text-lg rounded-full">
        {avatarFallback}
      </div>

      <div className="flex-1">
        <div className="flex items-start gap-2">
          <p className="text-sm text-gray-500">{timeAgo}</p>{" "}
        </div>

        <div className="flex items-center gap-2">
          <p className="font-semibold text-gray-800">{comment.user.username}</p>
        </div>

        <p className="text-gray-700 mt-2 text-sm">{comment.body}</p>
      </div>
    </div>
  );
};

export default Comment;
