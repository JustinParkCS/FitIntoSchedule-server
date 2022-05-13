import express from "express";
import { userModel } from "../models";

const userRouter = express.Router();
userRouter.route("/signin/").post(async (req, res, next) => {
  try {
    const user = await userModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(400).send("No matching user found.");
    } else {
      if (user.password !== req.body.password) {
        return res.status(400).send("Incorrect email or password");
      }
    }
    return res.status(200).send(user);
  } catch (err) {
    return res.status(400).send(err);
  }
});

userRouter.route("/signup/").post(async (req, res, next) => {
  // Check if this user already exisits
  let user = await userModel.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("That user already exisits!");
  } else {
    // Insert the new user if they do not exist yet
    user = new userModel({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });
    await user.save();
    res.send(user);
  }
});

userRouter.route("/get-all/").get(async (req, res, next) => {
  try {
    const data = await userModel.find({});
    if (data) {
      return res.status(200).send(data);
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

userRouter.route("/put/").put(async (req, res, next) => {
  try {
    await userModel.findOneAndUpdate({ email: req.query.email }, req.body, {
      new: true,
      upsert: true,
    });
    return res.status(200).send("User modification successful. ");
  } catch (err) {
    return res.status(400).send(err);
  }
});

userRouter.route("/post-friend/").put(async (req, res, next) => {
  userModel.exists({ _id: req.body.id }, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      if (result) {
        userModel.findOneAndUpdate(
          { email: req.body.email },
          { $push: { friend_emails: req.body.friend_emails } },
          // { upsert: true, new: true, setDefaultsOnInsert: true },

          (err, result) => {
            if (err) return res.status(400).send(err);
            else return res.status(200).send("success");
          }
        );
      } else {
        try {
          const newUser = new foodHistoryModel(req.body);
          newUser.save();
        } catch (err) {
          return res.status(450).send(err.stack);
        }
      }
    }
  });
});

export default userRouter;
