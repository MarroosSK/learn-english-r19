import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router";
import { fetchSearchResults } from "../api/api-calls";

interface SearchResult {
  id: string;
  title: string;
  body: string;
  imageUrl: string;
  difficulty: string;
  createdAt: string;
  userId: string;
}

const PageSearch = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const { data, isLoading, error } = useQuery({
    queryKey: ["searchResults", query],
    queryFn: () => fetchSearchResults(query as string),
  });

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
    <div className="px-4  flex flex-col items-center mx-auto py-24 max-w-7xl">
      <h1 className="text-2xl md:text-4xl  font-bold mb-8">
        Search Results for <span className="text-stone-800">"{query}"</span>
      </h1>

      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-12">
          {data.map((result: SearchResult, index: number) => (
            <div key={index} className="relative mb-4">
              <Link
                to={`/reading/${result.difficulty}/${result.id}`}
                className="hover:underline"
              >
                <div className="p-4">
                  <h2 className="absolute bottom-10 left-6 z-[10] p-6 bg-white  text-xl  font-bold tracking-tight ">
                    {result.title}
                  </h2>
                  <img
                    src={result.imageUrl}
                    className="w-[250px] h-[250px] object-cover"
                    alt={`Reading ${result.title}`}
                    loading="lazy"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className=" text-xl">No results found.</p>
      )}
    </div>
  );
};

export default PageSearch;
