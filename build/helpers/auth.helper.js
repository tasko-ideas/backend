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
const sharp_1 = __importDefault(require("sharp"));
const form_data_1 = __importDefault(require("form-data"));
const axios_1 = __importDefault(require("axios"));
const user_model_1 = __importDefault(require("../models/user.model"));
const environment_1 = require("../config/environment");
const AuthHelper = {
    uploadImage: (file) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!AuthHelper.validateImage(file)) {
                return null;
            }
            const data = new form_data_1.default();
            data.append('image', file.buffer);
            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://api.imgur.com/3/image',
                headers: Object.assign({ 'Authorization': `Client-ID ${environment_1.imgurClientId}` }, data.getHeaders()),
                data: data,
            };
            const imgurResponse = yield (0, axios_1.default)(config);
            return imgurResponse.data.data.link;
        }
        catch (imgurError) {
            console.error('Imgur Error:', imgurError);
            return null;
        }
    }),
    validateImage: (imageFile) => __awaiter(void 0, void 0, void 0, function* () {
        if (!imageFile || !imageFile.mimetype.startsWith('image/')) {
            return false;
        }
        const imageBuffer = imageFile.data;
        const imageDimensions = yield (0, sharp_1.default)(imageBuffer).metadata();
        if (imageDimensions.width > 300 || imageDimensions.height > 300) {
            return false;
        }
        return true;
    }),
    calendarItemSave: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findById(userId);
            if (!user) {
                return null;
            }
            /*
            if (!user.calendar[year]) {
              user.calendar[year] = {};
            }
            if (!user.calendar[year][month]) {
              user.calendar[year][month] = {};
            }
            if (!user.calendar[year][month][day]) {
              user.calendar[year][month][day] = [];
            }
            user.calendar[year][month][day].push(calendarItemId);
            user.tasks.push(savedTaskId);
            await userModel.updateOne(
              { _id: userId },
              { $set: { calendar: user.calendar, tasks: user.tasks } }
            );
              */
            return user;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }),
};
exports.default = AuthHelper;
