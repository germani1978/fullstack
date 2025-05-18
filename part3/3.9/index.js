import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

//PORT
const PORT = process.env.PORT || 3001

let persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456'
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523'
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: 4,
        name: 'Mary Poppendieck',
        number: '39-23-6423122'
    }
]

//to create server
const app = express()
morgan.token('type', function (req, res) {
    return req.headers['content-type']
})

//to use body
app.use(express.json())

//permit make a call from this address
app.use(cors({ origin: 'http://localhost:5173' }))

morgan.token('body', request => {
    if (request.method === 'POST') return JSON.stringify(request.body)
    else ''
})

app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :body'
    )
)

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const lon = persons.length
    const date = Date()
    response.send(`<p>Phone has info for ${lon} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const person = persons.find(
        person => person.id === Number(request.params.id)
    )
    if (!person) response.status(404).json({ msg: 'person not found' })
    else response.json(person)
})

app.post('/api/persons/', (request, response) => {
    //create random id
    const id = persons.length === 0 ? 0 : Math.floor(Math.random() * 1000000)

    //extract body
    const body = request.body

    //check if include name and number
    if (!body.name || !body.number)
        return response
            .status(400)
            .json({ error: 'name and number are required' })

    const nameExists = persons.some(person => person.name === body.name)
    if (nameExists) {
        return response.status(400).json({ error: 'name must be unique' })
    }

    //add new person
    const person = { id: id, name: body.name, number: body.number }
    persons.push(person)

    //send response
    response.status(201).json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    persons = persons.filter(person => person.id !== Number(request.params.id))
    response.status(204).end()
})

//listen on PORT
app.listen(PORT, () => {
    console.log('Server on PORT', PORT)
})
