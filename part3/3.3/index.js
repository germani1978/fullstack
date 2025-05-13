import express from 'express'

//PORT
const PORT = 3001

const app = express()

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

//listen on PORT
app.listen(PORT, () => {
    console.log('Server on PORT', PORT)
})
