import { useState } from 'react'
import Filter from './components/Filter'
import FormPerson from './components/FormPerson'
import Persons from './components/Persons'

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

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleFilter={handleFilter} nameFilter={nameFilter} />
            <h2>Add a new</h2>
            <FormPerson
                handleForm={handleForm}
                handleInputName={handleInputName}
                newName={newName}
                handleInputPhone={handleInputPhone}
                newPhone={newPhone}
            />
            <h2>Numbers</h2>
            <Persons personFilter={personFilter} />
        </div>
    )
}

export default App
