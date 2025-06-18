import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export const CORS_ORIGIN = process.env.CORS_ORIGIN;
export const PORT = process.env.PORT || 5000;
export const JWT_KEY = process.env.JWT_KEY;
export const MONGO_URI = process.env.MONGO_URI;
