"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imgurClientSecret = exports.imgurClientId = exports.jwtSecret = exports.mongourl = exports.PORT = exports.staticsfiles = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.staticsfiles = process.env.STATICFILES || './src/public';
exports.PORT = process.env.PORT || 3000;
exports.mongourl = process.env.MONGOURL || 'mongodb+srv://ZeroSwordDev:0404Gordito.@cluster0.nbjgadt.mongodb.net/nextTask';
exports.jwtSecret = process.env.JWT_SECRET || 'MUYSECRETO';
exports.imgurClientId = process.env.IMGURCLIENTID || '08ae8f69ca44f7f';
exports.imgurClientSecret = process.env.IMGURCLIENTSECRET || '5bfd95791f4bc293ae8d937fe2959133a62c086e';
