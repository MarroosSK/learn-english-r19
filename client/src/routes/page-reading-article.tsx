import { useQuery } from "@tanstack/react-query";
import { MessageSquareMore } from "lucide-react";
import { useEffect } from "react";

import { get1Article } from "../api/api-calls";
import ArticleLikes from "../components/article-likes";
import Comment from "../components/comment";
import CommentForm from "../components/comment-form";
import { useParams } from "react-router";

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

const PageReadingArticle = () => {
  const { id } = useParams();
  const {
    data: article,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["article", id],
    queryFn: () => get1Article(id as string),
  });

  //console.log(article);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error loading article</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4 m-4 pb-32">
      {article && (
        <>
          <img
            src={article.imageUrl}
            className="w-full h-[500px] object-cover"
            alt={`Reading ${article.title}`}
            loading="lazy"
          />
          <div className="flex flex-col justify-center text-2xl p-6">
            <div className="flex flex-col items-start gap-y-4 px-6">
              <h3 className="   text-2xl sm:text-4xl font-bold tracking-tight ">
                {article.title}
              </h3>
              <div className="flex items-center gap-x-4">
                <ArticleLikes
                  initialLikes={article.likes}
                  articleId={article.id}
                />
                <MessageSquareMore /> {article.comments.length}
              </div>
              <p className="prose prose-base prose-zinc mt-6 text-lg leading-8 dark:prose-invert">
                {article.body}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-4 justify-center text-2xl p-12">
            <h2 className="text-xl  font-bold">Comments</h2>
            <CommentForm article={article} refetchArticle={refetch} />
            <div className="w-full p-6 " data-id="comment-list">
              {article.comments &&
                article.comments.map((comment: CommentI, index: number) => (
                  <Comment comment={comment} key={index} />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PageReadingArticle;
