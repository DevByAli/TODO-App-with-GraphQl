import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, { dbName: process.env.DB_NAME });
    console.log("Connected to the database");
  } catch (error) {
    setTimeout(() => {
      console.log("Retrying to connect to the database...");
      connectDB();
    }, 5000);
  }
};

export default connectDB;