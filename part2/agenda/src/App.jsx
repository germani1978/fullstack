import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [nameFilter, setNameFilter] = useState('')

    const handleForm = e => {
        e.preventDefault()
        const existPerson = persons.some(person => person.name == newName)
        if (existPerson) {
            setNewName('')
            setNewPhone('')
            window.alert(`${newName} is already added to phonebook`)
            return
        }
        const objectPerson = {
            name: newName,
            phone: newPhone
        }
        setPersons(persons.concat(objectPerson))
        setNewName('')
        setNewPhone('')
    }

    const handleInputName = e => {
        setNewName(e.target.value)
    }

    const handleInputPhone = e => {
        setNewPhone(e.target.value)
    }

    const handleFilter = e => {
        setNameFilter(e.target.value)
    }

    const personFilter =
        nameFilter.length != 0
            ? persons.filter(person =>
                  person.name.toLowerCase().includes(nameFilter)
              )
            : persons

    console.log({ personFilter })

    return (
        <div>
            <form onSubmit={handleForm}>
                <h2>Phonebook</h2>
                <input onChange={handleFilter} value={nameFilter} />
                <h2>Add a new</h2>
                <div>
                    name: <input onChange={handleInputName} value={newName} />
                </div>
                <div>
                    number:{' '}
                    <input onChange={handleInputPhone} value={newPhone} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {personFilter.map(person => (
                    <div key={person.name}>
                        {person.name} {person.phone}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App
