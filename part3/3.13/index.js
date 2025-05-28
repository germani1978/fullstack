import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import dotenv from 'dotenv'
dotenv.config()
import Agenda from './agenda.js'

//PORT
const PORT = process.env.PORT || 3001

// let persons = [
//     {
//         id: 1,
//         name: 'Arto Hellas',
//         number: '040-123456'
//     },
//     {
//         id: 2,
//         name: 'Ada Lovelace',
//         number: '39-44-5323523'
//     },
//     {
//         id: 3,
//         name: 'Dan Abramov',
//         number: '12-43-234345'
//     },
//     {
//         id: 4,
//         name: 'Mary Poppendieck',
//         number: '39-23-6423122'
//     }
// ]

//to create server
const app = express()
morgan.token('type', function (req, res) {
    return req.headers['content-type']
})

//to use body
app.use(express.json())
app.use(express.static('dist'))

//permit make a call from this address
app.use(cors())

morgan.token('body', request => {
    if (request.method === 'POST') return JSON.stringify(request.body)
    else ''
})

app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :body'
    )
)

//get all persons of agenda
app.get('/api/persons', (request, response) => {
    Agenda.find({}).then(persons => {
        response.json(persons)
    })
})

//get info
app.get('/info', (request, response) => {
    const lon = Agenda.length
    const date = Date()
    response.send(`<p>Phone has info for ${lon} people</p><p>${date}</p>`)
})

//get person by id
app.get('/api/persons/:id', (request, response) => {
    Agenda.findById(request.params.id)
        .then(person => response.status(200).json(person))
        .catch(err => response.status(404).json({ msg: 'person not found' }))
})

//save in mongodb
app.post('/api/persons/', (request, response) => {
    //extract body
    const body = request.body

    //check if include name and number
    if (!body.name || !body.number)
        return response
            .status(400)
            .json({ error: 'name and number are required' })

    //add new person
    const person = new Agenda({
        name: body.name,
        number: body.number
    })
    person.save().then(personSave => {
        response.status(201).json(personSave)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Agenda.findByIdAndDelete(request.params.id)
        .then(res => response.status(204).end)
        .catch(err => response.status(404).json({ msg: 'Not deleted' }))
})

//listen on PORT
app.listen(PORT, () => {
    console.log('Server on PORT', PORT)
})
