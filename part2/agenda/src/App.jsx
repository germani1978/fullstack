import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
    const [newName, setNewName] = useState('')

    const handleForm = e => {
        e.preventDefault()
        const objectPerson = {
            name: newName
        }
        setPersons(persons.concat(objectPerson))
        setNewName('')
    }

    const handleInput = e => {
        setNewName(e.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleForm}>
                <div>
                    name: <input onChange={handleInput} value={newName} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {persons.map(person => (
                    <div key={person.name}>{person.name}</div>
                ))}
            </div>
        </div>
    )
}

export default App
