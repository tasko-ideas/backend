import dotenv from 'dotenv'
dotenv.config()

export const staticsfiles = process.env.STATICFILES || './src/public'
export const PORT = process.env.PORT || 3000

export const mongourl = process.env.MONGOURL || 'mongodb+srv://ZeroSwordDev:0404Gordito.@cluster0.nbjgadt.mongodb.net/nextTask'

export const jwtSecret = process.env.JWT_SECRET || 'MUYSECRETO'

export const imgurClientId = process.env.IMGURCLIENTID || '08ae8f69ca44f7f'
export const imgurClientSecret = process.env.IMGURCLIENTSECRET || '5bfd95791f4bc293ae8d937fe2959133a62c086e'