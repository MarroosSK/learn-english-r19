import { UserResource } from "@clerk/types";
import axios from "axios";
import { toast } from "sonner";
import {
  ContactFormI,
  EditUserI,
  MakeTestimonialI,
  WordI,
} from "../types/types";

interface SwitchLikeI {
  userId: string;
  articleId: string;
}

//  get/create account
export const getOrCreateUser = async (user: UserResource) => {
  const { id, firstName, lastName } = user;
  const email = user.emailAddresses[0].emailAddress;
  const name = `${firstName ?? ""} ${lastName ?? ""}`;
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_URL}user-account`,
      {
        id,
        username: name,
        email,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// get user (used in feedback/contact)
export const getUser = async (userId: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_URL}user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

// edit user name
export const editUser = async (data: EditUserI) => {
  axios.patch(`${import.meta.env.VITE_URL}edit-user`, data);
};

// get All Words
export const getWords = async () => {
  const response = await axios.get(`${import.meta.env.VITE_URL}vocabulary`);
  return response.data;
};

// add searched word to List
export const addWordToList = async (data: WordI) => {
  const response = await axios.post(
    `${import.meta.env.VITE_URL}vocabulary/new`,
    data
  );
  return response.data;
};

// edit word
export const editWord = async (data: WordI) => {
  const response = await axios.patch(
    `${import.meta.env.VITE_URL}vocabulary/edit`,
    data
  );
  return response.data;
};

// delete word from List
export const handleDelete = async (wordId: string) => {
  await axios.delete(`${import.meta.env.VITE_URL}vocabulary/delete/${wordId}`);
  toast("Successfully deleted from list!");
};

// send message to support
export const sendSupportMsg = async (data: ContactFormI) => {
  axios.post(`${import.meta.env.VITE_URL}support`, data);
};

// get all public Feedbacks
export const fetchTestimonials = async () => {
  const response = await axios.get(`${import.meta.env.VITE_URL}feedbacks`);
  return response.data;
};

//make public feedback
export const makeTestimonial = async (data: MakeTestimonialI) => {
  axios.post(`${import.meta.env.VITE_URL}feedback-new`, data);
};

// get 1 article
export const get1Article = async (id: string) => {
  const response = await axios.get(`${import.meta.env.VITE_URL}article/${id}`);
  return response.data;
};

// get results from search input
export const fetchSearchResults = async (query: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_URL}search?query=${query}`
  );
  return response.data;
};

// get number of likes
export const fetchLikes = async (articleId: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_URL}article/${articleId}`
  );
  return response.data.likes;
};

// +/- like
export const switchLike = async (data: SwitchLikeI) => {
  await axios.post(`${import.meta.env.VITE_URL}like`, {
    articleId: data.articleId,
    userId: data.userId,
  });
};

// get category of articles (A1 - C2)
export const getArticlesByDifficulty = async (difficulty: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_URL}articles/${difficulty}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

// create commet for article
export const makeComment = async (
  articleId: string,
  userId: string,
  body: string
) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_URL}comment`, {
      articleId,
      userId,
      body,
    });
    return response.data;
  } catch (error) {
    console.error("Something went wrong:", error);
    return null;
  }
};
