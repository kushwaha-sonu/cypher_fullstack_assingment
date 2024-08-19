import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/dB.js";
const app = express();


import authRoutes from "./routes/auth.route.js"
import questionRoutes from "./routes/question.route.js"


dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello From Backend");
});

app.use("/api/auth", authRoutes);
app.use("/api/question",questionRoutes);


app.listen(process.env.PORT || 5000, async (error) => {
    if (error) return console.log(`Error: ${error}`);
    await connectDB();
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
  });
