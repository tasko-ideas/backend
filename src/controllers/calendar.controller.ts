import { Request, Response } from "express-serve-static-core";
import userModel from "../models/user.model";
import calendarItemModel from "../models/calendarItem.model";
//import { UserHelper } from "../helpers/userHelper";
import taskModel from "../models/task.model";

const CalendarController = {

  createCalendarItem: async (req: Request, res: Response) => {
    try {
      const { title, description, startDate, endDate, type } = req.body;

      const user = await userModel.findOne({ _id: req.user });
      if (!user) {
        return res
          .status(403)
          .json({ message: "you don't have permission to do that" });
      }

      if (type.length === 0) throw new Error("no type provided");
      if (type === "task") {
        const newTask = new taskModel({
          UserId: user._id,
          title,
          description,
        });

        const savedTask = await newTask.save();
        const createCalendarItem = new calendarItemModel({
          userId: user._id,
          title: savedTask.title,
          description: savedTask.description,
          startDate,
          endDate,
          items: [newTask._id],
        });

        const year = startDate.split("-")[0];
        const month = startDate.split("-")[1];
        const day = startDate.split("-")[2];

        const newCalendarItem = await createCalendarItem.save();
        const newCalendarItemId = newCalendarItem._id;
        const savedTaskId = savedTask._id;
        //await UserHelper.calendarItemSave(user._id, newCalendarItemId, savedTaskId, year, month, day);
        console.log(newCalendarItemId, savedTaskId, year, month, day);

        return res.status(200).json({
          message: "Calendar entry created successfully",
          newCalendarItem,
        });
      } else {
        return res.status(400).json({ message: "Bad request" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error Internal Server!", error });
    }
  },

  getAllCalendar: async (req: Request, res: Response) => {
    try {
      const user = await userModel.findOne({ _id: req.user });
      if (!user) {
        return res
          .status(403)
          .json({ message: "you don't have permission to do that" });
      }
      return res.status(200).json(user.calendar);
    } catch (error) {
      return res.status(500).json("Error Internal Server!");
    }
  },

  getCalendarByYear: async (req: Request, res: Response) => {
    try {
      const user = await userModel.findOne({ _id: req.user });
      if (!user) {
        return res
          .status(403)
          .json({ message: "you don't have permission to do that" });
      }
      return res
        .status(200)
      //.json(user.calendar[req.params.year]);
    } catch (error) {
      return res.status(500).json("Error Internal Server!");
    }
  },

  getCalendarByMonth: async (req: Request, res: Response) => {
    try {
      const user = await userModel.findOne({ _id: req.user });
      if (!user) {
        return res
          .status(403)
          .json({ message: "you don't have permission to do that" });
      }
      return res
        .status(200)
      //.json(user.calendar[req.params.year][req.params.month]);
    } catch (error) {
      return res.status(500).json("Error Internal Server!");
    }
  },

  getCalendarByDay: async (req: Request, res: Response) => {
    try {
      const user = await userModel.findOne({ _id: req.user });
      if (!user) {
        return res
          .status(403)
          .json({ message: "you don't have permission to do that" });
      }
      return res
        .status(200)
      //.json(user.calendar[req.params.year][req.params.month][req.params.day]);
    } catch (error) {
      return res.status(500).json("Error Internal Server!");
    }
  },

}

export default CalendarController