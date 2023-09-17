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
exports.getCalendarByDay = exports.getCalendarByMonth = exports.getCalendarByYear = exports.getAllCalendar = exports.createCalendarItem = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const calendarItem_model_1 = __importDefault(require("../models/calendarItem.model"));
//import { UserHelper } from "../helpers/userHelper";
const task_model_1 = __importDefault(require("../models/task.model"));
const createCalendarItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, startDate, endDate, type } = req.body;
        const user = yield user_model_1.default.findOne({ _id: req.user });
        if (!user) {
            return res
                .status(403)
                .json({ message: "you don't have permission to do that" });
        }
        if (type.length === 0)
            throw new Error("no type provided");
        if (type === "task") {
            const newTask = new task_model_1.default({
                UserId: user._id,
                title,
                description,
            });
            const savedTask = yield newTask.save();
            const createCalendarItem = new calendarItem_model_1.default({
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
            const newCalendarItem = yield createCalendarItem.save();
            const newCalendarItemId = newCalendarItem._id;
            const savedTaskId = savedTask._id;
            //await UserHelper.calendarItemSave(user._id, newCalendarItemId, savedTaskId, year, month, day);
            console.log(newCalendarItemId, savedTaskId, year, month, day);
            return res.status(200).json({
                message: "Calendar entry created successfully",
                newCalendarItem,
            });
        }
        else {
            return res.status(400).json({ message: "Bad request" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Error Internal Server!", error });
    }
});
exports.createCalendarItem = createCalendarItem;
const getAllCalendar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ _id: req.user });
        if (!user) {
            return res
                .status(403)
                .json({ message: "you don't have permission to do that" });
        }
        return res.status(200).json(user.calendar);
    }
    catch (error) {
        return res.status(500).json("Error Internal Server!");
    }
});
exports.getAllCalendar = getAllCalendar;
const getCalendarByYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ _id: req.user });
        if (!user) {
            return res
                .status(403)
                .json({ message: "you don't have permission to do that" });
        }
        return res
            .status(200);
        //.json(user.calendar[req.params.year]);
    }
    catch (error) {
        return res.status(500).json("Error Internal Server!");
    }
});
exports.getCalendarByYear = getCalendarByYear;
const getCalendarByMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ _id: req.user });
        if (!user) {
            return res
                .status(403)
                .json({ message: "you don't have permission to do that" });
        }
        return res
            .status(200);
        //.json(user.calendar[req.params.year][req.params.month]);
    }
    catch (error) {
        return res.status(500).json("Error Internal Server!");
    }
});
exports.getCalendarByMonth = getCalendarByMonth;
const getCalendarByDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ _id: req.user });
        if (!user) {
            return res
                .status(403)
                .json({ message: "you don't have permission to do that" });
        }
        return res
            .status(200);
        //.json(user.calendar[req.params.year][req.params.month][req.params.day]);
    }
    catch (error) {
        return res.status(500).json("Error Internal Server!");
    }
});
exports.getCalendarByDay = getCalendarByDay;
