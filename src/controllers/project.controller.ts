import { Request, Response } from "express-serve-static-core";
import projectModel from "../models/project.model";
import userModel from "../models/user.model";
import taskModel from "../models/task.model";

export namespace ProjectController {

  export const createProject = async (req: Request, res: Response) => {
    try {
      const { name, description } = req.body;
      const user = await userModel.findOne({ _id: req.user });
      if (!user) {
        return res
          .status(403)
          .json({ message: "you don't have permission to do that" });
      }
      const createProject = new projectModel({
        name,
        description,
        admins: [user._id],
      });
      const newProject = await createProject.save();
      user.projects.push(newProject._id);
      user.passwordCheck = user.password; // no me gusta esta solucion... buscar otra forma
      await user.save();
      return res
        .status(200)
        .json({ message: "Project created successfully", newProject });

    } catch (error) {
      return res.status(500).json("Error Internal Server!");
    }
  }

  export const getProjects = async (req: Request, res: Response) => {
    try {
      const user = await userModel.findOne({ _id: req.user });
      if (!user) {
        return res
          .status(403)
          .json({ message: "you don't have permission to do that" });
      }
      const projects = await projectModel.find({ admins: user._id });
      if (!projects) {
        return res.status(404).json("Projects not found");
      }
      return res.status(200).json(projects);

    } catch (error) {
      return res.status(500).json("Error Internal Server!");
    }
  }

  export const createBoard = async (req: Request, res: Response) => {
    try {
      const { projectId, boardName } = req.body;
      const project = await projectModel.findOne({ _id: projectId });
      if (!project) {
        return res.status(404).json("Project not found");
      }
      project.boards.push({
        title: boardName,
        columns: [],
      })
      await project.save();
      return res
        .status(200)
        .json({ message: "Board created successfully" });

    } catch (error) {
      return res.status(500).json("Error Internal Server!");
    }
  }

  export const addColumn = async (req: Request, res: Response) => {
    try {
      const { projectId, boardName, columnName } = req.body;
      const project = await projectModel.findOne({ _id: projectId });
      const board = project?.boards.find((board) => board.title === boardName);

      if (!project || !board) {
        return res.status(404).json("Resource not found");
      }

      board.columns.push({
        title: columnName,
        tasks: [],
      })
      await project.save();

      return res.status(200).json({ message: "Column created successfully" });
    } catch (error) {
      return res.status(500).json("Error Internal Server!");
    }
  }

  export const addTask = async (req: Request, res: Response) => {
    try {
      const { projectId, boardName, columnName, taskId } = req.body;
      const project = await projectModel.findOne({ _id: projectId });
      const board = project?.boards.find((board) => board.title === boardName);
      const column = board?.columns.find((column) => column.title === columnName);
      const task = await taskModel.findOne({ _id: taskId });

      if (!project || !board || !column || !task) {
        return res.status(404).json("Resource not found");
      }

      if (column.tasks.includes(task._id)) {
        return res.status(400).json("Task already in column");
      }

      column.tasks.push(task._id);
      await project.save();

      return res.status(200).json({ message: "Task added successfully" });
    } catch (error) {
      return res.status(500).json("Internal Server Error");
    }
  };

};