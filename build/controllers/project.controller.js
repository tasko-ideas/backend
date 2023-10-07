"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const project_model_1 = __importDefault(require("../models/project.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const task_model_1 = __importDefault(require("../models/task.model"));
const ProjectController = {
    createProject: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, description } = req.body;
            const user = yield user_model_1.default.findOne({ _id: req.user });
            if (!user) {
                return res
                    .status(403)
                    .json({ message: "you don't have permission to do that" });
            }
            const createProject = new project_model_1.default({
                name,
                description,
                admins: [user._id],
            });
            const newProject = yield createProject.save();
            user.projects.push(newProject._id);
            user.passwordCheck = user.password; // no me gusta esta solucion... buscar otra forma
            yield user.save();
            return res
                .status(200)
                .json({ message: "Project created successfully", newProject });
        }
        catch (error) {
            return res.status(500).json("Error Internal Server!");
        }
    }),
    getProjects: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findOne({ _id: req.user });
            if (!user) {
                return res
                    .status(403)
                    .json({ message: "you don't have permission to do that" });
            }
            const projects = yield project_model_1.default.find({ admins: user._id });
            if (!projects) {
                return res.status(404).json("Projects not found");
            }
            return res.status(200).json(projects);
        }
        catch (error) {
            return res.status(500).json("Error Internal Server!");
        }
    }),
    createBoard: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { projectId, boardName } = req.body;
            const project = yield project_model_1.default.findOne({ _id: projectId });
            if (!project) {
                return res.status(404).json("Project not found");
            }
            project.boards.push({
                title: boardName,
                columns: [],
            });
            yield project.save();
            return res
                .status(200)
                .json({ message: "Board created successfully" });
        }
        catch (error) {
            return res.status(500).json("Error Internal Server!");
        }
    }),
    addColumn: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { projectId, boardName, columnName } = req.body;
            const project = yield project_model_1.default.findOne({ _id: projectId });
            const board = project === null || project === void 0 ? void 0 : project.boards.find((board) => board.title === boardName);
            if (!project || !board) {
                return res.status(404).json("Resource not found");
            }
            board.columns.push({
                title: columnName,
                tasks: [],
            });
            yield project.save();
            return res.status(200).json({ message: "Column created successfully" });
        }
        catch (error) {
            return res.status(500).json("Error Internal Server!");
        }
    }),
    addTask: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { projectId, boardName, columnName, taskId } = req.body;
            const project = yield project_model_1.default.findOne({ _id: projectId });
            const board = project === null || project === void 0 ? void 0 : project.boards.find((board) => board.title === boardName);
            const column = board === null || board === void 0 ? void 0 : board.columns.find((column) => column.title === columnName);
            const task = yield task_model_1.default.findOne({ _id: taskId });
            if (!project || !board || !column || !task) {
                return res.status(404).json("Resource not found");
            }
            if (column.tasks.includes(task._id)) {
                return res.status(400).json("Task already in column");
            }
            column.tasks.push(task._id);
            yield project.save();
            return res.status(200).json({ message: "Task added successfully" });
        }
        catch (error) {
            return res.status(500).json("Internal Server Error");
        }
    }),
};
exports.default = ProjectController;
