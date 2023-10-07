
import { gptApiKey } from '../config/environment'
import axios from "axios"


const GptHelper = {

  textToTask: async (text: string): Promise<string[] | null> => {
    if (!text) {
      return null
    }

    const alctualdate = new Date()
    const chatGptResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
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
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${gptApiKey}`,
        }
      }
    )

    const expresion = /'([^']+)'/g;
    const data = [];
    let match;
    while ((match = expresion.exec(chatGptResponse.data.choices[0].message.content)) !== null) {
      data.push(match[1]);
    }

    return data
  }


}

export default GptHelper
