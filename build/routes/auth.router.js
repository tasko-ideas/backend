"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const auth_controller_1 = require("../controllers/auth.controller");
const authRouter = express_1.default.Router();
authRouter.post("/auth/login", (req, res) => {
    auth_controller_1.AuthController.login(req, res);
});
authRouter.post("/auth/register", (0, multer_1.default)().any(), (req, res) => {
    auth_controller_1.AuthController.register(req, res);
});
exports.default = authRouter;
