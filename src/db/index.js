import mongoose from "mongoose";

async function connectToDb() {
  try {
    // console.log("Trying to connect...");

    const connectionInstance = await mongoose.connect(
      process.env.DB_CONNECT);

    console.log(
      `MongoDB Connected:`
    );
  } catch (error) {
    console.error("DB Error:", error);
  }
}

export { connectToDb };
