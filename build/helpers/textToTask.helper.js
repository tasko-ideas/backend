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
const environment_1 = require("../config/environment");
const axios_1 = __importDefault(require("axios"));
const GptHelper = {
    textToTask: (text) => __awaiter(void 0, void 0, void 0, function* () {
        if (!text) {
            return null;
        }
        const alctualdate = new Date();
        const chatGptResponse = yield axios_1.default.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: `SQL para registrar tarea en tabla calendario unicamenete 2 campos: "descricion+persona" y "fecha+hora" a partir del siguiente texto. considerando que hoy es ${alctualdate}si no puedes determinar una única tarea, genera múltiples comandos SQL. Solo SQL en tu respuesta.`
                    //content: `Genera comando SQL para registrar campos:descripcion, fecha+hora usando ${alctualdate} y persona con la tarea.`
                },
                {
                    role: 'user',
                    content: text
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${environment_1.gptApiKey}`,
            }
        });
        const expresion = /'([^']+)'/g;
        const data = [];
        let match;
        while ((match = expresion.exec(chatGptResponse.data.choices[0].message.content)) !== null) {
            data.push(match[1]);
        }
        return data;
    })
};
exports.default = GptHelper;
