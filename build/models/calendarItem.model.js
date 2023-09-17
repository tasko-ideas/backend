"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const calendarItemSchema = new Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: String,
    startDate: { type: String, required: true },
    endDate: String,
    items: [
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Task" },
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Activity" },
    ],
}, { timestamps: true });
exports.default = model("CalendarItem", calendarItemSchema);
