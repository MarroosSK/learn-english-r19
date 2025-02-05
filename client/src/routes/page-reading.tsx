import { useEffect } from "react";
import ReadingTabs from "../components/sections/reading/reading-tabs";
import ReadingHero from "../components/sections/reading/reading-hero";

function PageReading() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section>
      <ReadingHero />
      <div className=" flex flex-col items-center justify-center px-4 m-4 space-y-12 py-24">
        <div className="space-y-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            Learn by Reading
          </h2>
          <div className="prose prose-base prose-zinc mt-6 text-lg leading-8 dark:prose-invert">
            Pick category and start reading.
          </div>
        </div>
        <ReadingTabs />
      </div>
    </section>
  );
}

export default PageReading;
