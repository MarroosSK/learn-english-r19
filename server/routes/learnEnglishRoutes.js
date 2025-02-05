import express from "express";
import {
  addWord,
  createComment,
  createFeedback,
  deleteComment,
  deleteWord,
  editComment,
  editUser,
  editWord,
  getAll,
  getAllFeedbacks,
  getByDifficulty,
  getOne,
  getOrCreateUser,
  getUser,
  getWords,
  messageSupport,
  reportArticle,
  searchArticles,
  switchLike,
} from "../controllers/learnEnglishController.js";

const learnEnglish = express.Router();

//search
learnEnglish.get("/search", searchArticles);
//account
learnEnglish.post("/user-account", getOrCreateUser);
//get user
learnEnglish.get("/user/:id", getUser);
//edit user
learnEnglish.patch("/edit-user", editUser);
//articles
learnEnglish.get("/articles", getAll);
learnEnglish.get("/articles/:difficulty", getByDifficulty);
learnEnglish.get("/article/:id", getOne);
//comments
learnEnglish.post("/comment", createComment);
learnEnglish.patch("/comment/:id", editComment);
learnEnglish.delete("/comment/:id", deleteComment);
//like/dislike
learnEnglish.post("/like", switchLike);
//report
learnEnglish.post("/report", reportArticle);
//report
learnEnglish.post("/support", messageSupport);
//feedback
learnEnglish.post("/feedback-new", createFeedback);
learnEnglish.get("/feedbacks", getAllFeedbacks);
// vocabulary
learnEnglish.get("/vocabulary", getWords);
learnEnglish.post("/vocabulary/new", addWord);
learnEnglish.patch("/vocabulary/edit", editWord);
learnEnglish.delete("/vocabulary/delete/:id", deleteWord);

export default learnEnglish;
