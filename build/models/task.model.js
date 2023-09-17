"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const taskSchema = new Schema({
    UserId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    title: { type: String },
    description: { type: String },
    members: [
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", default: [] },
    ],
    calendarId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "CalendarItem",
        default: null,
    },
}, { timestamps: true });
exports.default = model("Tasks", taskSchema);
