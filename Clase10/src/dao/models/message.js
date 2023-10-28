//imports
import mongoose from "mongoose";

//schema
const messageSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const message = new mongoose.model("messages", messageSchema);

export default message;
