"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gptApiKey = exports.imgurClientSecret = exports.imgurClientId = exports.jwtSecret = exports.mongourl = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 3000;
exports.mongourl = process.env.MONGOURL || 'mongodb://localhost:27017/nextTask';
exports.jwtSecret = process.env.JWT_SECRET || 'txt';
exports.imgurClientId = process.env.IMGURCLIENTID || 'txt';
exports.imgurClientSecret = process.env.IMGURCLIENTSECRET || 'txt';
exports.gptApiKey = process.env.GPTAPIKEY || 'txt';
