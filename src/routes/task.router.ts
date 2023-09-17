import express from "express";
import { addMember, createTask, editTask } from "../controllers/task.controller";
import passport from "passport";
const tasksRouter = express.Router();

tasksRouter.post(
  "/tasks",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    createTask(req, res);
  }
);
tasksRouter.put(
  "/tasks/:id",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    editTask(req, res);
  }
);
tasksRouter.put(
  "/tasks/addMember/:id",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    addMember(req, res);
  }
);

export default tasksRouter;
