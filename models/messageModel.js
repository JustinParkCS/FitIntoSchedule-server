import mongoose from "mongoose";

const messageSchemaModel = new mongoose.Schema({
  user_a_email: {
    type: String,
    required: false,
  },
  user_b_email: {
    type: String,
    required: false,
  },
  messages: [
    {
      user_email: {
        type: String,
        required: false,
      },
      user_agree: {
        type: Boolean,
        required: true,
        default: false,
      },
      date: {
        type: Date,
        default: Date,
        required: true,
      },
    },
  ],
});

const messageModel = mongoose.model("messages", messageSchemaModel);
export default messageModel;
