import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
    const [newName, setNewName] = useState('')

    const handleForm = e => {
        e.preventDefault()
        const existPerson = persons.some(person => person.name == newName)
        if (existPerson) {
            setNewName('')
            window.alert(`${newName} is already added to phonebook`)
            return
        }
        const objectPerson = {
            name: newName
        }
        setPersons(persons.concat(objectPerson))
        setNewName('')
        console.log('paso')
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
