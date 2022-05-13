import mongoose from "mongoose";

const meetingSchemaModel = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  user_a_email: {
    type: String,
    required: false,
  },
  user_a_agree: {
    type: Boolean,
    required: true,
    default: true,
  },
  user_b_email: {
    type: String,
    required: false,
  },
  user_b_agree: {
    type: Boolean,
    required: true,
    default: false,
  },
  date_start: {
    type: Date,
    default: Date,
    required: true,
  },
  date_end: {
    type: Date,
    default: Date,
    required: true,
  },
});

const meetingModel = mongoose.model("meetings", meetingSchemaModel);
export default meetingModel;
