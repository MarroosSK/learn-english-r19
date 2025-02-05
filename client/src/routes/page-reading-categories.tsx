import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router";
import { getArticlesByDifficulty } from "../api/api-calls";
import { useEffect } from "react";
import CategoryImageBox from "@/components/category-image-box";

interface ArticleI {
  id: string;
  title: string;
  body: string;
  imageUrl: string;
  difficulty: string;
  createdAt: string;
  userId: string;
}

const PageReadingCategories = () => {
  const { category } = useParams();

  const {
    data: articles,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["articles", category],
    queryFn: () => getArticlesByDifficulty(category as string),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <p>Error loading articles</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 m-4 pb-32">
      <h2 className="text-4xl font-bold text-stone-800">{category} articles</h2>
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-12"
        style={{ minHeight: "500px" }}
      >
        {articles &&
          articles.map((article: ArticleI) => (
            <div key={article.id} className="relative shadow-md">
              <NavLink to={`/reading/${category}/${article.id}`}>
                <div className="flex flex-col items-center gap-x-6 ">
                  <div className="w-full relative h-auto mx-auto overflow-hidden rounded-lg">
                    <CategoryImageBox
                      src={article.imageUrl}
                      title={article.title}
                    />
                  </div>

                  <h3 className="absolute bottom-10 left-6 z-[10] p-6 bg-white  text-2xl sm:text-4xl font-bold tracking-tight ">
                    {article.title}
                  </h3>
                </div>
              </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PageReadingCategories;
