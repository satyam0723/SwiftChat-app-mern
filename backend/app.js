import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/AuthRoutes.js";
import { CORS_ORIGIN } from "./config.js";
import contactRoutes from "./routes/ContactRoutes.js";

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send("Welcome to chat-app API");
});
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
export { app };
