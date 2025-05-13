import express from 'express'

//PORT
const PORT = 3001

//to create server
const app = express()

//to use body
app.use(express.json())

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

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const lon = persons.length
    const date = Date()
    response.send(`<p>Phonebook has info for ${lon} people</p><p>${date}</p>`)
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
        return response.status(400).json({ error: 'name must be unique' })

    //add new person
    const person = { id: id, name: body.name, number: body.number }
    persons.push(person)

    //send response
    response.status(200).json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
    let res = persons.filter(person => person.id !== Number(request.params.id))
    response.status(204).end()
})

//listen on PORT
app.listen(PORT, () => {
    console.log('Server on PORT', PORT)
})
