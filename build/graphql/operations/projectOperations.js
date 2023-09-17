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
exports.createProject = void 0;
const project_model_1 = __importDefault(require("../../models/project.model"));
const user_model_1 = __importDefault(require("../../models/user.model")); // Asumiendo que tienes el modelo User definido
const createProject = (args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = args;
    const user = yield user_model_1.default.findOne({ _id: context.req.user }); // Accede al usuario desde el contexto de GraphQL
    if (!user) {
        throw new Error("You don't have permission to do that");
    }
    const createProject = new project_model_1.default({
        name,
        description,
        admins: [user._id],
    });
    try {
        const newProject = yield createProject.save();
        user.projects.push(newProject._id);
        user.passwordCheck = user.password; // no me gusta esta solucion... buscar otra forma
        yield user.save();
        return newProject;
    }
    catch (error) {
        throw new Error("Internal Server Error");
    }
});
exports.createProject = createProject;
