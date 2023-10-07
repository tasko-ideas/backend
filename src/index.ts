import express from 'express'
import passport from 'passport'
import passportLocal from './middlewares/passport.mid'
import cors from 'cors'
import morgan from 'morgan'

import connectToDb from './config/db'
import authRouter from './routes/auth.router'
import calendarRouter from './routes/calendar.router'
import projectRouter from './routes/project.router'

import { PORT } from './config/environment'
import tasksRouter from './routes/task.router'

const app = express()

// -------------- Middelewares
app.use(passport.initialize())
passport.use(passportLocal)
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// ---------------- Routes
app.use('/api', calendarRouter)
app.use('/api', authRouter)
app.use('/api', tasksRouter)
app.use('/api', projectRouter)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
  connectToDb()
})
