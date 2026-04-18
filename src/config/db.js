import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod;

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "test") {
      mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      await mongoose.connect(uri);
      console.log("MongoDB (in-memory) connected");
      // expose for cleanup
      global.__MONGOD__ = mongod;
      return;
    }

    if (!process.env.MONGO_URI) {
      console.warn("MONGO_URI not set - skipping DB connection");
      return;
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection failed", error);
  }
};

process.on("exit", async () => {
  try {
    await mongoose.disconnect();
    if (global.__MONGOD__) await global.__MONGOD__.stop();
  } catch (e) {}
});

export default connectDB;