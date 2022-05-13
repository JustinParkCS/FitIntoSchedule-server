import express from "express";
import { messageModel } from "../models";

const messageRouter = express.Router();

messageRouter.route("/get-all/").get(async (req, res, next) => {
  try {
    const data = await messageModel.find({});
    if (data) {
      return res.status(200).send(data);
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

messageRouter.route("/get/").get(async (req, res, next) => {
  try {
    const data = await messageModel.find({});
    if (data) {
      return res.status(200).send(data);
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

messageRouter.route("/post/").put(async (req, res, next) => {
  try {
    const result = await messageModel.findOne({
      user_a_email: req.body.user_email,
    });
    const isFound = result.messages.some((element) => {
      if (element.user_email === req.body.user_email) {
        return true;
      }
    });
    if (!isFound) {
      await messageModel.findOneAndUpdate(
        { user_a_email: req.body.user_email },
        { $push: { messages: req.body.messages } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      return res.status(200).send("message post successful.");
    } else {
      // Include post
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

export default messageRouter;
