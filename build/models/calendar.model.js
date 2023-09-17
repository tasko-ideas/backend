"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const calendarSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    calendar: { type: mongoose_1.Schema.Types.Mixed, default: {} }
});
exports.default = (0, mongoose_1.model)("Calendar", calendarSchema);
