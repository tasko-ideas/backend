import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 3000
export const mongourl = process.env.MONGOURL || 'mongodb://localhost:27017/nextTask'
export const jwtSecret = process.env.JWT_SECRET || 'txt'
export const imgurClientId = process.env.IMGURCLIENTID || 'txt'
export const imgurClientSecret = process.env.IMGURCLIENTSECRET || 'txt'
export const gptApiKey = process.env.GPTAPIKEY || 'txt'