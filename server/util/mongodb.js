import mongoose from "mongoose";

export const connectMongoDB = async () => {
  if(!process.env.MONGODB_URI){
    console.log("MONGODB_URI not found in .env file");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
