"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = __importDefault(require("../controllers/task.controller"));
const passport_1 = __importDefault(require("passport"));
const tasksRouter = express_1.default.Router();
tasksRouter.post("/tasks", passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
    task_controller_1.default.createTask(req, res);
});
tasksRouter.put("/tasks/:id", passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
    task_controller_1.default.editTask(req, res);
});
tasksRouter.put("/tasks/addMember/:id", passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
    task_controller_1.default.addMember(req, res);
});
exports.default = tasksRouter;
