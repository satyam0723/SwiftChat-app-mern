import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected. DB host: ${conn.connection.host}`);
  } catch (error) {
    console.log("db connect karne m error: ", error.message);
    process.exit(1);
  }
};

export default connectDB;
