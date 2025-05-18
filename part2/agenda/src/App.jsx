import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import FormPerson from './components/FormPerson'
import Persons from './components/Persons'
import { create, getAll, deletePerson, update } from './services/persons'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [nameFilter, setNameFilter] = useState('')
    const [message, setMessage] = useState(null)

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

        deletePerson(id)
            .then(response => {
                const personsWithoutPersonId = [...persons].filter(
                    person => person.id != id
                )
                setPersons(personsWithoutPersonId)
                setMessage('Person deleted')
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
            .catch(err => {
                console.log({ id })
                console.log({ persons })

                setMessage("The person can't deleted")
                console.log(err.message)

                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
    }

    //add or update a person
    const handleForm = e => {
        //not restart web
        e.preventDefault()

        //check if the person exist
        const personSavedAlready = persons.find(
            person => person.name == newName
        )

        if (personSavedAlready) {
            //the person don't have changes
            if (personSavedAlready.number == newPhone) {
                window.alert(`${newName} is already added to agenda`)
                setNewName('')
                setNewPhone('')
                return
            } else {
                //new person with changes
                const resp = window.confirm(
                    `${newName} is already added to agenda, replace the old number with a new one`
                )
                if (!resp) return

                update(personSavedAlready.id, {
                    name: personSavedAlready.name,
                    number: newPhone
                })
                    .then(response => {
                        //update the state
                        const aux = persons.map(person =>
                            person.id == personSavedAlready.id
                                ? response.data
                                : person
                        )
                        setPersons(aux)
                        setNewName('')
                        setNewPhone('')

                        //make a notification
                        setMessage('Person updated...')
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                    })
                    .catch(err => {
                        setMessage('Can update data of persons')
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
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
            setMessage('Person added')

            setTimeout(() => {
                setMessage(null)
            }, 5000)

            setNewName('')
            setNewPhone('')
        })
    }

    //set new name on input
    const handleInputName = e => setNewName(e.target.value)

    //set new phone on input
    const handleInputPhone = e => setNewPhone(e.target.value)

    //set filter of person name
    const handleFilter = e => setNameFilter(e.target.value)

    //get persons by filter
    const personFilter =
        nameFilter.length != 0
            ? persons.filter(person =>
                  person.name.toLowerCase().includes(nameFilter)
              )
            : persons

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} />
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
