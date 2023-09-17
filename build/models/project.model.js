"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please fill your project name"],
    },
    description: String,
    admins: [{ type: mongoose_1.Types.ObjectId, ref: "User" }],
    members: [{ type: mongoose_1.Types.ObjectId, ref: "User" }],
    boards: [
        {
            title: { type: String, required: true },
            columns: [
                {
                    title: { type: String, required: true },
                    tasks: [{ type: mongoose_1.Types.ObjectId, ref: "Task" }],
                },
            ],
        },
    ],
});
exports.default = (0, mongoose_1.model)("Project", projectSchema);
