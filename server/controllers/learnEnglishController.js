import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

/*

 SEARCH 

 */

export const searchArticles = async (req, res) => {
  const { query } = req.query;

  try {
    const articles = await db.article.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            body: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Combined GET USER / CREATE ACCOUNT
export const getOrCreateUser = async (req, res) => {
  const { id, firstName, lastName, email } = req.body;

  try {
    let user = await db.user.findUnique({
      where: { id },
      include: {
        comments: {
          select: {
            id: true,
            body: true,
            article: true,
          },
        },
        likes: true,
        vocabulary: true,
      },
    });

    if (!user) {
      const name = `${firstName ?? ""} ${lastName ?? ""}`;
      user = await db.user.create({
        data: {
          id: id,
          username: name,
          email: email,
        },
      });
      console.log(`User created with id: ${id}, email: ${email}`);
    } else {
      console.log(`User found with id: ${id}`);
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET USER
export const getUser = async (req, res) => {
  const id = req.params.id;
  console.log(`getUser called with id: ${id}`);
  try {
    const userAccount = await db.user.findUnique({
      where: { id },
      include: {
        comments: {
          select: {
            id: true,
            body: true,
            article: true,
          },
        },
      },
    });

    if (!userAccount) {
      console.log("not logged in");
    }
    return res.status(200).json(userAccount);
  } catch (error) {
    return res.status(500).json(error);
  }
};

/*
 GET ALL
*/
export const getAll = async (req, res) => {
  try {
    const articles = await db.article.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (articles.length === 0) {
      return res.status(404).json("Articles not found!");
    }

    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json(error);
  }
};

/*
    GET 1 ARTICLE
*/

export const getOne = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const article = await db.article.findUnique({
      where: { id },
      include: {
        comments: {
          select: {
            _count: true,
            body: true,
            createdAt: true,
            user: true,
          },
          orderBy: {
            createdAt: "desc", // Zoradiť komentáre od najnovších po najstaršie
          },
        },
        likes: true,
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!article) {
      return res.status(404).json("Article not found!");
    }
    console.log(article);
    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json(error);
  }
};

/*
    GET ARTICLES BY DIFFICULTY
*/

export const getByDifficulty = async (req, res) => {
  const difficulty = req.params.difficulty;
  try {
    const articles = await db.article.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        difficulty: {
          equals: difficulty,
        },
      },
    });

    if (articles.length === 0) {
      return res.status(404).json("Articles not found!");
    }

    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// NEW COMMENT
export const createComment = async (req, res) => {
  const { articleId, userId, body } = req.body;
  try {
    const comment = await db.comment.create({
      data: { body, articleId, userId },
    });
    return res.status(201).json(comment);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// EDIT COMMENT
export const editComment = async (req, res) => {
  const { userId, commentId, body } = req.body;

  try {
    const comment = await db.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return res.status(404).json("Comment not found!");
    }

    if (comment.userId !== userId) {
      return res.status(403).json("You are not allowed to edit this comment!");
    }

    const updatedComment = await db.comment.update({
      where: { id: commentId },
      data: { body },
    });

    return res.status(200).json(updatedComment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// DELETE COMMENT
export const deleteComment = async (req, res) => {
  const { userId } = req.body;
  const { commentId } = req.params;

  try {
    const comment = await db.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return res.status(404).json("Comment not found!");
    }

    if (comment.userId !== userId) {
      return res
        .status(403)
        .json("You are not allowed to delete this comment!");
    }

    await db.comment.delete({
      where: { id: commentId },
    });

    return res.status(200).json("Comment deleted successfully!");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// LIKE/ DISLIKE for ARTICLE
export const switchLike = async (req, res) => {
  const { articleId, userId } = req.body;

  try {
    const existingLike = await db.like.findFirst({
      where: {
        articleId,
        userId,
      },
    });

    if (existingLike) {
      await db.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return res.status(200).json({ message: "Like removed" });
    } else {
      const newLike = await db.like.create({
        data: {
          articleId,
          userId,
        },
      });
      return res.status(201).json({ message: "Like added", like: newLike });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// REPORT ARTICLE
export const reportArticle = async (req, res) => {
  const { articleId, userId, title, body } = req.body;
  try {
    const report = await db.report.create({
      data: { articleId, userId, title, body },
    });
    return res.status(201).json(report);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// SUPPORT MESSAGE
export const messageSupport = async (req, res) => {
  const { userId, title, body } = req.body;
  try {
    const msg = await db.supportMessage.create({
      data: { userId, title, body },
    });
    return res.status(201).json(msg);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// CREATE FEEDBACK
export const createFeedback = async (req, res) => {
  const { userId, username, body } = req.body;
  try {
    const feedback = await db.feedback.create({
      data: { userId, username, body },
    });
    return res.status(201).json(feedback);
  } catch (error) {
    console.error("Error creating feedback:", error);
    return res.status(500).json(error);
  }
};

// GET ALL FEEDBACKS
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await db.feedback.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 9,
    });
    console.log(feedbacks);
    return res.status(200).json(feedbacks);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// EDIT USER
export const editUser = async (req, res) => {
  const { userId, username } = req.body;
  try {
    const userAccount = await db.user.findUnique({
      where: { id: userId },
    });

    if (!userAccount) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
      },
    });

    const updatedFeedbacks = await db.feedback.updateMany({
      where: {
        userId,
      },
      data: {
        username,
      },
    });

    console.log(updatedUser);
    console.log(updatedFeedbacks);

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error editing user:", error);
    return res.status(500).json({ message: "Failed to update user" });
  }
};
// GET WORDS TO LEARN
export const getWords = async (req, res) => {
  const { userId } = req.query;
  try {
    const words = await db.vocabulary.findMany({ where: { id: userId } });

    return res.status(200).json(words);
  } catch (error) {
    return res.status(500).json(error);
  }
};
// ADD WORD TO LEARN
export const addWord = async (req, res) => {
  const { userId, word, meaning, link } = req.body;

  try {
    const wordExist = await db.vocabulary.findFirst({
      where: {
        userId: userId,
        word: word,
      },
    });

    if (!wordExist) {
      await db.vocabulary.create({
        data: {
          word,
          meaning,
          link,
          userId,
        },
      });
      return res.status(200).json("Word added to the list!");
    } else {
      return res.status(200).json("Word is already on your list!");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
// EDIT WORD TO LEARN
export const editWord = async (req, res) => {
  const { userId, word, meaning } = req.body;

  try {
    const wordExist = await db.vocabulary.findFirst({
      where: {
        userId: userId,
        word: word,
      },
    });

    if (!wordExist) {
      return res.status(404).json({ error: "Word not found!" });
    }

    await db.vocabulary.update({
      where: {
        id: wordExist.id,
      },
      data: {
        meaning: meaning,
      },
    });

    return res.status(200).json("Word updated successfully!");
  } catch (error) {
    console.error("Error updating word:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// REMOVE WORD TO LEARN
export const deleteWord = async (req, res) => {
  const id = req.params.id;
  try {
    await db.vocabulary.delete({
      where: {
        id,
      },
    });

    return res.status(200).json("Deleted!");
  } catch (error) {
    return res.status(500).json(error);
  }
};
