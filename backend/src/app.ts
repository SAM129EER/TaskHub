import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.middleware.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  }),
);
app.use(cookieParser());

app.get("/", (req, res) => {
  const data = res.json({
    success: true,
    message: "Server is running",
  });

  console.log("backend running ");
  // res.send("backend running")
});

app.use(errorMiddleware);
export default app;
