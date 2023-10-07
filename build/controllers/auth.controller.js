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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const environment_1 = require("../config/environment");
const auth_helper_1 = __importDefault(require("../helpers/auth.helper"));
const AuthController = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { fullname, email, password, passwordCheck } = req.body;
            const user = new user_model_1.default({
                fullname,
                email,
                password,
                passwordCheck,
            });
            // Add profile image to imgur <---- arreglar logica para que guarde usuario aunque no haya podido subir imagen
            if (req.files) {
                const uploadImage = yield auth_helper_1.default.uploadImage(req.files[0]);
                if (!uploadImage) {
                    return res.status(500).json({ error: "Error al subir la imagen a Imgur." });
                }
                user.profileImageURL = uploadImage;
            }
            // Create user
            const newUser = yield user.save();
            if (!newUser) {
                return res.status(500).json({ error: "Error al crear el usuario." });
            }
            return res.status(200).json(newUser);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (error) {
            return res.status(403).json(error.message);
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                return res.status(403).json("Email not Found!");
            }
            const comparePassword = yield user.checkPassword(password, user.password);
            if (!comparePassword) {
                return res.status(403).json({ msg: 'Invalid Password' });
            }
            user.password = '';
            const token = jsonwebtoken_1.default.sign({ user: user }, environment_1.jwtSecret, { expiresIn: '1h' });
            return res.status(200).json({ user, token: token });
        }
        catch (error) {
            return res.status(403).json(error);
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield user_model_1.default.findByIdAndDelete({ _id: id });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            return res.status(200).json({ message: "User deleted successfully" });
        }
        catch (_a) {
            return res.status(500).json("Error Internal Server!");
        }
    }),
};
exports.default = AuthController;
