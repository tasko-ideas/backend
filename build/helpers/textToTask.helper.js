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
Object.defineProperty(exports, "__esModule", { value: true });
const chatgpt_1 = require("chatgpt");
const environment_1 = require("../config/environment");
const chatGpt = new chatgpt_1.ChatGPTAPI({
    apiKey: environment_1.gptApiKey,
});
const GptHelper = {
    textToTask: (text) => __awaiter(void 0, void 0, void 0, function* () {
        if (!text) {
            return null;
        }
        const prompt = "Genera un comando SQL para registrar una tarea en la tabla ‘calendario’ (descricion, fecha + hora) a partir del siguiente texto. Si no puedes determinar una única tarea, genera múltiples comandos SQL. Solo quiero el comando SQL en tu respuesta. Este es el texto:" + text;
        const apiRequestBody = {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: "system",
                    content: "Eres un experto en SQL"
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0,
        };
        const chatGptResponse = yield chatGpt.sendMessage(apiRequestBody);
        console.log(chatGptResponse);
        return 'yu';
    })
};
exports.default = GptHelper;
