import express from 'express'
import cors from 'cors'
import { agendaRouter } from './controllers/people'
import { errorHandler, requestLogger, unknownEndpoint } from './utils/middleware'
import mongoose from 'mongoose'
import { MONGO_URI } from './utils/config'
import { error, info } from './utils/logger'

//to create server
const app = express()

mongoose.set('strictQuery', false)

info('conecting to', MONGO_URI)

mongoose
  .connect(MONGO_URI)
  .then(() => {
    info('Connected to MongoDB')
  })
  .catch(err => {
    error('Error connecting to MongoDB:', err.message)
  })


//permit make a call from this address
app.use(cors())

//to use static files
app.use(express.static('dist'))

//to use body
app.use(express.json())

//MIDDLEWRES
app.use(requestLogger)

//to use routers
app.use('/api/persons', agendaRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export { app }

//use morgan to log the request in console
// app.use(morgan('dev'))
// morgan.token('type', function (req, ) {
//   return req.headers['content-type']
// })
// morgan.token('body', request => {
//   if (request.method === 'POST') return JSON.stringify(request.body)
//   else ''
// })
// app.use(
//   morgan(
//     ':method :url :status :res[content-length] - :response-time ms :body'
//   )
// )
