import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import { Layout } from "./layout/layout.tsx";
import Providers from "./provider/providers.tsx";
import PageHome from "./routes/page-home.tsx";
import PageProfile from "./routes/page-profile.tsx";
import PageReadingArticle from "./routes/page-reading-article.tsx";
import PageReadingCategories from "./routes/page-reading-categories.tsx";
import PageReading from "./routes/page-reading.tsx";
import PageSearch from "./routes/page-search.tsx";
import PageTerms from "./routes/page-terms.tsx";
import PageVocabulary from "./routes/page-vocabulary.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      // HOME
      {
        path: "/",
        element: <PageHome />,
      },
      // PROFILE
      {
        path: "/profile",
        element: <PageProfile />,
      },
      // READING
      {
        path: "/reading",
        element: <PageReading />,
      },
      {
        path: "/reading/:category",
        element: <PageReadingCategories />,
      },
      {
        path: "/reading/:category/:id",
        element: <PageReadingArticle />,
      },
      //VOCABULARY
      {
        path: "/vocabulary",
        element: <PageVocabulary />,
      },
      // SEARCH
      {
        path: "/search",
        element: <PageSearch />,
      },
      //TERMS
      {
        path: "/terms",
        element: <PageTerms />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <Providers>
    <RouterProvider router={router} />
  </Providers>
);
