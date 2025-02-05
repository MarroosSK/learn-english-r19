import {
  useContext,
  useRef,
  useOptimistic,
  useActionState,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { DictionaryContext } from "@/context/dictionary-context";
import { useQuery } from "@tanstack/react-query";
import { Heart, Loader2 } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

import { toast } from "sonner";
import { Definitions, Meanings, Phonetics } from "@/types/types";
import { addWordToList, getWords } from "@/api/api-calls";
import { Link } from "react-router";

const SearchContent = () => {
  const { isSignedIn, user } = useUser();
  const contextValue = useContext(DictionaryContext);
  const searchedWord = contextValue?.savedWord;
  const formRef = useRef<HTMLFormElement>(null);

  const [wordsList, setWordsList] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const fetchWords = async () => {
      const words = await getWords();
      setWordsList(words);
    };
    fetchWords();
  }, []);
  const { data, isLoading, error } = useQuery({
    queryKey: ["words", searchedWord],
    queryFn: async () => {
      if (!searchedWord) return null;
      const response = await axios.get(
        `${import.meta.env.VITE_DICTIONARY_URL}${searchedWord}`
      );
      return response.data[0];
    },
    enabled: !!searchedWord,
  });

  const [optimisticHeart, addOptimisticHeart] = useOptimistic<boolean>(false);

  useEffect(() => {
    if (searchedWord && wordsList.includes(searchedWord)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [searchedWord, wordsList]);

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [state = {}, formAction] = useActionState(
    async (prevState: { error?: string }, formData: FormData) => {
      addOptimisticHeart(true);

      const wordData = {
        userId: user?.id,
        word: formData.get("word"),
        meaning: "",
        link: formData.get("link"),
      };

      try {
        const response = await addWordToList(wordData);
        toast(response);
        formRef?.current?.reset();
        setWordsList((prev) => [...prev, wordData.word as string]);
        console.log(state, prevState);
        return {};
      } catch (error) {
        addOptimisticHeart(false);
        return { error: "Failed to add word. Please try again." };
      }
    },
    {}
  );

  if (!searchedWord) return <div />;
  if (isLoading)
    return (
      <div className="md:min-h-screen flex justify-center gap-x-2 mx-auto py-10 text-xl tracking-wide ">
        Searching word <Loader2 className="animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="md:min-h-screen flex justify-center mx-auto py-10 text-xl tracking-wide ">
        Could not find it. Are you sure it is written this way?
      </div>
    );

  return (
    <div className="flex flex-col gap-y-4 py-12 md:min-h-screen">
      <h4 className="text-4xl font-semibold" data-id="word">
        {data?.word}
      </h4>
      <div>
        {data?.phonetics
          ?.slice(0, 1)
          .map((phonetic: Phonetics, index: number) => (
            <span key={index}>{phonetic.text}</span>
          ))}
      </div>

      {data?.meanings
        ?.filter((meaning: Meanings) => meaning.partOfSpeech === "noun")[0]
        ?.definitions?.slice(0, 3)
        .map((def: Definitions, index: number) => (
          <div key={index} className="mt-4">
            <ul>
              <li className="text-gray-500">{def.definition}</li>
            </ul>
          </div>
        ))}

      {data?.sourceUrls?.slice(0, 1).map((sourceUrl: string, index: number) => (
        <div key={index} className="mt-4 flex items-center gap-x-2">
          <a className="text-secondary" href={sourceUrl} target="_blank">
            <button
              className="bg-stone-800 text-lg px-4 py-2 rounded-md hover:bg-stone-300 text-white hover:text-stone-800 transition-all ease-in-out"
              data-id="details-button"
            >
              Details
            </button>
          </a>

          {isSignedIn && !isFavorite && (
            <form ref={formRef} action={formAction} data-id="add-word-form">
              <input type="hidden" name="word" value={data.word} />
              <input
                type="hidden"
                name="meaning"
                value={data?.meanings?.[0]?.definitions?.[0]?.definition}
              />
              <input type="hidden" name="link" value={data?.sourceUrls?.[0]} />
              <button
                className="bg-stone-800 text-lg px-4 py-2 rounded-md hover:bg-stone-300 text-white hover:text-stone-800 transition-all ease-in-out"
                data-id="add-to-wordlist-button"
              >
                <Heart color={optimisticHeart ? "red" : "gray"} />
              </button>
            </form>
          )}

          {isFavorite && (
            <span>
              In{" "}
              <Link to={"/profile"} className="font-bold underline">
                favourites
              </Link>
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
