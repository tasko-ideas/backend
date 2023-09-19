import express from "express";
import TaskController from "../controllers/task.controller";
import passport from "passport";
const tasksRouter = express.Router();

tasksRouter.post(
  "/tasks",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    TaskController.createTask(req, res);
  }
);
tasksRouter.put(
  "/tasks/:id",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    TaskController.editTask(req, res);
  }
);
tasksRouter.put(
  "/tasks/addMember/:id",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    TaskController.addMember(req, res);
  }
);

export default tasksRouter;
