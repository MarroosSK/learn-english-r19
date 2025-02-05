import { NavLink } from "react-router";
import homeReading from "@/assets/home-reading.webp";
import homeVocabulary from "@/assets/home-vocabulary.webp";

const HomeLearning = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden md:py-32 md:space-y-32"
    >
      {/* 1 */}
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:h-screen lg:items-center lg:px-12 md:py-32">
        <div className="mx-auto mt-32 max-w-3xl shrink-0 lg:mx-0 lg:mt-0 lg:max-w-xl lg:pt-8">
          <div>READING</div>

          <div className="mt-10 space-y-2">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              {`Practice your reading.`}
            </h1>
          </div>

          <p className="prose prose-base prose-zinc mt-6 text-lg leading-8 dark:prose-invert">
            {`Learn useful language to use at work
                or to communicate effectively with friends.`}
          </p>

          <div className="mt-10 flex items-center gap-x-8">
            <NavLink
              to={"/reading"}
              className="bg-stone-800 text-lg px-4 py-2 rounded-md hover:bg-stone-300 text-white hover:text-stone-800 transition-all ease-in-out "
            >
              Start reading
            </NavLink>
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-20">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div>
              <img
                src={homeReading}
                width={3600}
                height={2078}
                alt="Reading illustration"
                className="w-[76rem] rounded-lg bg-background/5 shadow-2xl ring-1 ring-foreground/10"
              />
            </div>
          </div>
        </div>
      </div>
      {/* 2 */}
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:h-screen lg:items-center lg:px-12 py-32 lg:flex-row-reverse">
        <div className="mx-auto max-w-3xl shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div>VOCABULARY</div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-6xl">
            Learn new words.
          </h1>
          <p className="prose prose-base prose-zinc mt-6 text-lg leading-8 dark:prose-invert">
            Improve your language level to be able to communicate in English
            effectively.
          </p>
          <div className="mt-10 flex items-center gap-x-8">
            <NavLink
              to={"/vocabulary"}
              className="cursor-pointer bg-stone-800 text-lg px-4 py-2 rounded-md  hover:bg-stone-300 text-white hover:text-stone-800 transition-all ease-in-out"
            >
              Check words
            </NavLink>
          </div>
        </div>
        <div className="relative flex max-w-2xl sm:mt-24 lg:mr-10 lg:max-w-none lg:flex-none xl:mr-20 ">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <img
              src={homeVocabulary}
              width={3600}
              height={2078}
              alt="Vocabulary Illustration"
              className="w-[76rem] rounded-lg bg-background/5 shadow-2xl ring-1 ring-foreground/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeLearning;
