import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import { env } from "./config/env.js";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(cookieParser());


app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TaskHub Auth API is healthy",
  });
});


app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

export default app;
