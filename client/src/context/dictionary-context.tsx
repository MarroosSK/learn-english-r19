import { createContext } from "react";
import { DictionaryTypes } from "../types/types";

export const DictionaryContext = createContext<DictionaryTypes | null>(null);
