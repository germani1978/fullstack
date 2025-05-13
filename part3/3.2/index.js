import express from 'express'

//PORT
const PORT = 3001

const app = express()

const person = [
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
    response.json(person)
})

app.get('/info', (request, response) => {
    const lon = person.length
    const date = Date()
    response.send(`<p>Phonebook has info for ${lon} people</p><p>${date}</p>`)
})

//listen on PORT
app.listen(PORT, () => {
    console.log('Server on PORT', PORT)
})
