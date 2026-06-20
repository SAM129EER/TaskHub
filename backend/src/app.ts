import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.middleware.js";
import authRoutes from "./module/auth/auth.routes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    // Browser origins do not include a trailing slash, so keep this exact.
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

app.get("/", (req, res) => {
  const data = res.json({
    success: true,
    message: "Server is running",
  });
  console.log("backend running", data);
  // res.send("backend running")
});

app.use("/api/auth", authRoutes);

app.use(errorMiddleware);
export default app;
