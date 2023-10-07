import { Request, Response } from "express";
import userModel from "../models/user.model";
import taskModel from "../models/task.model";
import GptHelper from "../helpers/textToTask.helper";

const TaskController = {

  createTask: async (req: Request, res: Response) => {
    try {
      const { title, description } = req.body;

      const user = await userModel.findOne({ _id: req.user });
      if (!user) {
        return res
          .status(403)
          .json({ message: "you don't have permission to do that" });
      }
      const createTask = new taskModel({
        UserId: user?._id,
        title,
        description,
      });
      const newTask = await createTask.save();
      user.tasks.push(newTask._id);
      await user.save();
      return res
        .status(200)
        .json({ message: "Task entry created successfully", newTask });
    } catch (error) {
      return res.status(500).json("Error Internal Server!");
    }
  },

  editTask: async (req: Request, res: Response) => {
    try {
      const { title, description } = req.body;
      const { id } = req.params;

      const user = await userModel.findOne({ _id: req.user });
      if (!user) {
        return res
          .status(403)
          .json({ message: "you don't have permission to do that" });
      }
      const task = await taskModel.findOne({ _id: id });
      if (task) {
        if (title) {
          task.title = title;
        }
        if (description) {
          task.description = description;
        }
        const taskSaved = await task.save();
        user.tasks = [...user.tasks, taskSaved._id];
        await user.save();
        return res
          .status(200)
          .json({ message: "Task entry edited successfully", taskSaved });
      } else {
        return res.status(400).json({ message: "Task not found" });
      }
    } catch (error) {
      return res.status(500).json("Error Internal Server!");
    }
  },

  addMember: async (req: Request, res: Response) => {
    const { memberId } = req.body;
    const { id } = req.params;
    try {
      const user = await userModel.findById({ _id: req.user });
      const member = await userModel.findById({ _id: memberId });
      if (!user)
        return res
          .status(403)
          .json({ message: "you don't have permission to do that" });

      const task = await taskModel.findById({ _id: id });
      if (!task) return res.status(400).json({ message: "Task not found" });
      if (!member) return res.status(400).json({ message: "member not found" });
      if (task) {
        task.members.push(memberId);
      }
      const taskSaved = await task.save();
      const taskSavedId = taskSaved._id;
      member.tasks.push(taskSavedId);
      console.log(member);
      const memberSaved = await member.save();
      return res
        .status(200)
        .json({
          message: "Task entry edited successfully",
          taskSaved,
          memberSaved,
        });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getTask: async (req: Request, res: Response) => {
    try {
      const prompt = req.body.prompt;
      const response = await GptHelper.textToTask(prompt);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

}

export default TaskController
