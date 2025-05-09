import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
    const [countries, setCountries] = useState(null)
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        if (searchInput == '') return
        axios
            .get(`https://restcountries.com/v3.1/name/${searchInput}`)
            .then(response => {
                setCountries(response.data)
                console.log({ searchInput })
                console.log(response.data.length)
            })
            .catch(err => console.log(err.message))
    }, [searchInput])

    const handleInput = e => {
        setSearchInput(e.target.value)
    }

    return (
        <div>
            <p>
                find countries:{' '}
                <input onChange={handleInput} value={searchInput} />
            </p>

            {searchInput !== '' ? <Board countries={countries} /> : null}
        </div>
    )
}

export default App

const Board = ({ countries }) => {
    if (countries == null) return <div>Fetching data...</div>

    if (countries.length == 0) return <div>There not country</div>

    if (countries.length > 10)
        return <div>Too many matches, specify another filter</div>

    if (countries.length == 1) {
        const country = countries[0]
        console.log(country.languages)

        return (
            <div>
                <h2>{country.name.common}</h2>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area}</p>
                <h2>Languages</h2>
                {Object.values(country.languages).map(l => (
                    <li key={l}>{l}</li>
                ))}
                <p></p>
                <img src={country.flags.png} alt="" />
            </div>
        )
    }

    return (
        <div>
            {countries.map(country => (
                <div key={country.name.common}>{country.name.common}</div>
            ))}
        </div>
    )
}
