import { ChangeEvent, useContext } from "react";
import { DictionaryContext } from "@/context/dictionary-context";

const Search = () => {
  const contextValue = useContext(DictionaryContext);

  return (
    <div className="">
      <form
        onSubmit={contextValue?.handleSubmit}
        className=""
        data-id="search-form"
      >
        <input
          className="border border-stone-800 rounded-lg px-4 py-2"
          type="text"
          placeholder="type and press Enter"
          value={contextValue?.searchWord}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            contextValue?.setSearchWord(e.target.value)
          }
          data-id="search-input-vocabulary"
        />
      </form>
    </div>
  );
};

export default Search;
