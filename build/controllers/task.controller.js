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
const user_model_1 = __importDefault(require("../models/user.model"));
const task_model_1 = __importDefault(require("../models/task.model"));
const textToTask_helper_1 = __importDefault(require("../helpers/textToTask.helper"));
const TaskController = {
    createTask: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, description } = req.body;
            const user = yield user_model_1.default.findOne({ _id: req.user });
            if (!user) {
                return res
                    .status(403)
                    .json({ message: "you don't have permission to do that" });
            }
            const createTask = new task_model_1.default({
                UserId: user === null || user === void 0 ? void 0 : user._id,
                title,
                description,
            });
            const newTask = yield createTask.save();
            user.tasks.push(newTask._id);
            yield user.save();
            return res
                .status(200)
                .json({ message: "Task entry created successfully", newTask });
        }
        catch (error) {
            return res.status(500).json("Error Internal Server!");
        }
    }),
    editTask: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, description } = req.body;
            const { id } = req.params;
            const user = yield user_model_1.default.findOne({ _id: req.user });
            if (!user) {
                return res
                    .status(403)
                    .json({ message: "you don't have permission to do that" });
            }
            const task = yield task_model_1.default.findOne({ _id: id });
            if (task) {
                if (title) {
                    task.title = title;
                }
                if (description) {
                    task.description = description;
                }
                const taskSaved = yield task.save();
                user.tasks = [...user.tasks, taskSaved._id];
                yield user.save();
                return res
                    .status(200)
                    .json({ message: "Task entry edited successfully", taskSaved });
            }
            else {
                return res.status(400).json({ message: "Task not found" });
            }
        }
        catch (error) {
            return res.status(500).json("Error Internal Server!");
        }
    }),
    addMember: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { memberId } = req.body;
        const { id } = req.params;
        try {
            const user = yield user_model_1.default.findById({ _id: req.user });
            const member = yield user_model_1.default.findById({ _id: memberId });
            if (!user)
                return res
                    .status(403)
                    .json({ message: "you don't have permission to do that" });
            const task = yield task_model_1.default.findById({ _id: id });
            if (!task)
                return res.status(400).json({ message: "Task not found" });
            if (!member)
                return res.status(400).json({ message: "member not found" });
            if (task) {
                task.members.push(memberId);
            }
            const taskSaved = yield task.save();
            const taskSavedId = taskSaved._id;
            member.tasks.push(taskSavedId);
            console.log(member);
            const memberSaved = yield member.save();
            return res
                .status(200)
                .json({
                message: "Task entry edited successfully",
                taskSaved,
                memberSaved,
            });
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }),
    getTask: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const prompt = req.body.prompt;
            const response = yield textToTask_helper_1.default.textToTask(prompt);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    })
};
exports.default = TaskController;
