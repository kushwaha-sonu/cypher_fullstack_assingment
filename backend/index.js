import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/dB.js";
const app = express();


import authRoutes from "./routes/auth.route.js"
import questionRoutes from "./routes/question.route.js"
import answerRoutes from "./routes/answer.route.js"
import {evaluateAnswersController} from "./controller/evaluateAnswers.controller.js";


dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://cypher-fullstack-assingment-n18u.vercel.app",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello From Backend");
});

app.use("/api/auth", authRoutes);
app.use("/api/question",questionRoutes);
app.use('/api/user_answer',answerRoutes);


app.listen(process.env.PORT || 5000, async (error) => {
    if (error) return console.log(`Error: ${error}`);
    await connectDB();
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
  });
