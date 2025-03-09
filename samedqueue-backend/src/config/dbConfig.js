import mongoose from "mongoose";
import { ENVIRONMENT } from "./environment.js";
// import colors from "colors";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(ENVIRONMENT.DB.URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(
      `Connected To DB ${mongoose.connection.host} successfully!`
    );
  } catch (error) {
    console.log("Error: " + error.message);
    process.exit(1);
  }
};
