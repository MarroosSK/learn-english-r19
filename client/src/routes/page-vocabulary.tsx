import { useEffect } from "react";
import Search from "../components/sections/vocabulary/search";
import SearchContent from "../components/sections/vocabulary/search.content";
import VocabularyHero from "../components/sections/vocabulary/vocabulary-hero";

const PageVocabulary = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section>
      <VocabularyHero />
      <div className=" flex flex-col items-center justify-center px-4 m-4 space-y-12 py-24">
        <div className="space-y-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight">Find Words</h2>
          <div className="prose prose-base prose-zinc mt-6 text-lg leading-8 dark:prose-invert">
            Search for meaning of word you don't understand from text.
          </div>
        </div>
        <Search />
        <SearchContent />
      </div>
    </section>
  );
};

export default PageVocabulary;
