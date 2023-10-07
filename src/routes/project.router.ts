import express from "express";
import ProjectController from "../controllers/project.controller";
import passport from "passport";

const projectRouter = express.Router();

projectRouter.post(
  "/project/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ProjectController.createProject(req, res);
  }
)

projectRouter.get(
  "/project",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ProjectController.getProjects(req, res);
  }
)

projectRouter.post(
  "/project/addBoard",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ProjectController.createBoard(req, res);
  }
)

projectRouter.post(
  "/project/addColumn",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ProjectController.addColumn(req, res);
  }
)

projectRouter.post(
  "/project/addTask",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ProjectController.addTask(req, res);
  }
)

export default projectRouter;