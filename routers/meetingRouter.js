import express from "express";
import { meetingModel } from "../models";

const meetingRouter = express.Router();

meetingRouter.route("/get-all/").get(async (req, res, next) => {
  try {
    const data = await meetingModel.find({});
    if (data) {
      let newData = [];
      data.forEach((item) => {
        let aux_obj = {
          text: item.title,
          resource: item.user_a_email,
          id: item._id,
          start: item.date_start,
          end: item.date_end,
        };
        newData.push({ ...aux_obj, ...item._doc });
      });
      return res.status(200).send(newData);
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

meetingRouter.route("/post/").post(async (req, res, next) => {
  try {
    await meetingModel.insertMany([req.body]);
    return res.status(200).send("meeting post successful.");
  } catch (err) {
    return res.status(400).send(err);
  }
});

meetingRouter.route("/put/").put(async (req, res, next) => {
  try {
    const query = { _id: req.query.id };
    await meetingModel.findOneAndUpdate(query, req.body, {
      new: true,
      upsert: true,
    });
    return res.status(200).send("Meeting modification successful. ");
  } catch (err) {
    return res.status(400).send(err);
  }
});

meetingRouter.route("/delete/").delete(async (req, res, next) => {
  try {
    const query = { _id: req.query.id };
    const result = await meetingModel.deleteOne(query);
    if (result.deletedCount === 1) {
      return res.status(200).send("Delete successful.");
    } else {
      return res.status(400).send("Delete unsuccessful.");
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

export default meetingRouter;
