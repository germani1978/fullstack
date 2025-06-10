import express from 'express'
import cors from 'cors'
import blogRouter from './controllers/controllers.js'
import mongoose from 'mongoose'
import { MONGO_URI } from './utils/config.js'
import { info, error } from './utils/logger.js'

export const app = express()

mongoose.set('strictQuery', false)

info('conecting to', MONGO_URI)

mongoose
  .connect(MONGO_URI)
  .then(() => {
    info('Connected to MongoDB')
  })
  .catch((err) => {
    error('Error connecting to mongo', err.message)
  })


app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use('/blog', blogRouter)

