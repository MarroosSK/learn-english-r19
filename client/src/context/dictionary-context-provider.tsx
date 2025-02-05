import { useState, FormEvent } from "react";

import { ChildrenProps, DictionaryTypes } from "../types/types";
import { DictionaryContext } from "./dictionary-context";

export const DictionaryContextProvider = ({ children }: ChildrenProps) => {
  const [searchWord, setSearchWord] = useState("");
  const [savedWord, setSavedWord] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavedWord(searchWord);
  };

  const contextValue: DictionaryTypes = {
    searchWord,
    setSearchWord,
    savedWord,
    setSavedWord,
    handleSubmit,
  };

  return (
    <DictionaryContext.Provider value={contextValue}>
      {children}
    </DictionaryContext.Provider>
  );
};
