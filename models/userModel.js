import mongoose from "mongoose";

const userSchemaModel = new mongoose.Schema({
  email: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  //   role: {
  //     type: String,
  //     required: false,
  //   },
  friend_emails: [
    {
      type: String,
      required: false,
    },
  ],
});

const userModel = mongoose.model("users", userSchemaModel);
export default userModel;
