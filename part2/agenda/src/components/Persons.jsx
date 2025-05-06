import React from 'react'
import { deletePerson } from '../services/persons'

function Persons({ personFilter, handleDeletePerson }) {
    return (
        <div>
            {personFilter.map(person => (
                <div key={person.name}>
                    {person.name} {person.number}{' '}
                    <button
                        onClick={() => {
                            handleDeletePerson(person.id)
                        }}
                    >
                        delete
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Persons
