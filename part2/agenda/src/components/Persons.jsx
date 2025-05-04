import React from 'react'

function Persons({ personFilter }) {
    return (
        <div>
            {personFilter.map(person => (
                <div key={person.name}>
                    {person.name} {person.phone}
                </div>
            ))}
        </div>
    )
}

export default Persons
