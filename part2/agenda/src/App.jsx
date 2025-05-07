import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import FormPerson from './components/FormPerson'
import Persons from './components/Persons'
import { create, getAll, deletePerson, update } from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [nameFilter, setNameFilter] = useState('')

    //get from the server
    useEffect(() => {
        getAll().then(response => {
            setPersons(response.data)
        })
    }, [])

    //delete a person
    const handleDeletePerson = id => {
        //check if you want delete a person with id
        const personToDelete = persons.find(person => person.id == id)
        if (!window.confirm(`Delete a ${personToDelete.name}`)) return

        //deleting person
        const personsWithoudPersonId = [...persons].filter(
            person => person.id != id
        )

        setPersons(personsWithoudPersonId)
        deletePerson(id)
            .then(response => console.log('Deleted element'))
            .catch(err => console.log(err))
    }

    const handleForm = e => {
        //evoid restart web
        e.preventDefault()

        //check if the person exist
        const personeSavedAlready = persons.find(
            person => person.name == newName
        )

        if (personeSavedAlready) {
            //the person dont have changes
            if (personeSavedAlready.number == newPhone) {
                window.alert(`${newName} is already added to phonebook`)
                setNewName('')
                setNewPhone('')
                return
            } else {
                //new person with changes
                const resp = window.confirm(
                    `${newName} is already added to phonebook, replace the old number with a new one`
                )
                if (!resp) return

                update(personeSavedAlready.id, {
                    name: personeSavedAlready.name,
                    number: newPhone
                }).then(response => {
                    const aux = persons.map(person =>
                        person.id == personeSavedAlready.id
                            ? response.data
                            : person
                    )
                    //update the state
                    console.log('Updated person')
                    setPersons(aux)
                    setNewName('')
                    setNewPhone('')
                })
                return
            }
        }

        //create new Object of persons
        const objectPerson = {
            name: newName,
            number: newPhone
        }

        //add to server
        create(objectPerson).then(response => {
            //add to state
            setPersons(persons.concat(response.data))
            setNewName('')
            setNewPhone('')
        })
    }
    const handleInputName = e => setNewName(e.target.value)

    const handleInputPhone = e => setNewPhone(e.target.value)

    const handleFilter = e => setNameFilter(e.target.value)

    //filter person by name
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
            <Persons
                personFilter={personFilter}
                handleDeletePerson={handleDeletePerson}
            />
        </div>
    )
}

export default App
