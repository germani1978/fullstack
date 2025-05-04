import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', phone: '777-234-4567' }
    ])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')

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

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleForm}>
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
                {persons.map(person => (
                    <div key={person.name}>
                        {person.name} {person.phone}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App
