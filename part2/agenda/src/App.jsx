import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import FormPerson from './components/FormPerson'
import Persons from './components/Persons'
import { create, getAll } from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [nameFilter, setNameFilter] = useState('')

    useEffect(() => {
        getAll().then(response => {
            setPersons(response.data)
        })
    }, [])

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
            number: newPhone
        }
        create(objectPerson).then(response => {
            setPersons(persons.concat(response.data))
            setNewName('')
            setNewPhone('')
        })
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
