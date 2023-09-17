"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const project_controller_1 = require("../controllers/project.controller");
const passport_1 = __importDefault(require("passport"));
const projectRouter = express_1.default.Router();
projectRouter.post("/project/create", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    project_controller_1.ProjectController.createProject(req, res);
});
projectRouter.get("/project", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    project_controller_1.ProjectController.getProjects(req, res);
});
projectRouter.post("/project/addBoard", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    project_controller_1.ProjectController.createBoard(req, res);
});
projectRouter.post("/project/addColumn", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    project_controller_1.ProjectController.addColumn(req, res);
});
projectRouter.post("/project/addTask", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    project_controller_1.ProjectController.addTask(req, res);
});
exports.default = projectRouter;
