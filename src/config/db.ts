import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connection = mongoose.connect(process.env.Database as string);
export { connection };
