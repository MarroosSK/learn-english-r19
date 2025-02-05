// for navbar
export interface NavbarLinkI {
  path: string;
  title: string;
}

import { FormEvent, ReactNode } from "react";

// for context
export interface DictionaryTypes {
  searchWord: string;
  savedWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  setSavedWord: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
export interface ChildrenProps {
  children: ReactNode;
}

// for vocabulary
export interface Licence {
  name: string;
  url: string;
}
export interface Phonetics {
  text: string;
  audio: string;
  sourceUrl: string;
  licence: Licence;
}

export interface Definitions {
  definition: string;
  example: string;
  synonyms: string[];
  antonyms: string[];
}

export interface Meanings {
  partOfSpeech: string;
  definitions: Definitions[];
}

export interface WordType {
  word: string;
  phonetic: string;
  phonetics: Phonetics[];
  meanings: Meanings[];
  licence: Licence;
  sourceUrls: string[];
}

// user and comment form
interface User {
  id: string;
  email: string;
  username: string;
  role: string;
}

interface Comment {
  _count: {
    likes: number;
  };
  body: string;
  createdAt: string;
  user: User;
}

interface Like {
  id: number;
  createdAt: string;
  userId: string;
  articleId: string;
  commentId: string | null;
}

export interface ArticleI {
  id: string;
  title: string;
  body: string;
  imageUrl: string;
  difficulty: string;
  createdAt: string;
  userId: string;
  comments: Comment[];
  likes: Like[];
  user: {
    id: string;
  };
}

//testimonial

export interface MakeTestimonialI {
  userId: string | undefined;
  username: string;
  body: FormDataEntryValue | null;
}

export interface TestimonialI {
  body: string;
  username: string;
}

// support / contact

export interface ContactFormI {
  userId: string | undefined;
  title: FormDataEntryValue | null;
  body: FormDataEntryValue | null;
}

//word

export interface WordI {
  userId: string | undefined;
  word: FormDataEntryValue | null;
  meaning: FormDataEntryValue | null;
  // link: FormDataEntryValue | null;
}

//edit user

export interface EditUserI {
  userId: string | undefined;
  username: FormDataEntryValue | null;
}

//current user
interface Article {
  id: string;
  title: string;
  body: string;
  imageUrl: string;
  difficulty: string;
  createdAt: string;
  userId: string;
}

interface Comment {
  id: string;
  body: string;
  article: Article;
}

interface Like {
  id: number;
  createdAt: string;
  userId: string;
  articleId: string;
  commentId: string | null;
}

interface Vocabulary {
  id: string;
  word: string;
  meaning: string;
  link: string;
  createdAt: string;
  userId: string;
}

export interface CurrentUserI {
  id: string;
  email: string;
  username: string;
  role: string;
  comments: Comment[];
  likes: Like[];
  vocabulary: Vocabulary[];
}
