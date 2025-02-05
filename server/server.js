import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import learnEnglish from "./routes/learnEnglishRoutes.js";
dotenv.config();

const port = process.env.PORT || 3002;
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3001",
      "http://localhost:3002",
      "https://learn-english-by-reading.vercel.app",
    ],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/", learnEnglish);
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
