import axios from 'axios'
import { useEffect, useState } from 'react'

const Board = ({ countries, setSearchInput, isLoading }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {}, [weather])

    useEffect(() => {
        if (countries && countries.length == 1) {
            console.log(countries[0].name.common)
            axios
                .get(
                    `${import.meta.env.VITE_URL}q=${
                        countries[0].name.common
                    }&appid=${import.meta.env.VITE_APPID}&units=metric`
                )
                .then(response => setWeather(response.data))
                .catch(err => {
                    console.log(err.message)
                    setWeather(null)
                })
        }
    }, [countries])

    //loading
    if (isLoading) return <div>Loading ...</div>

    //
    if (countries == null) return <div>Start typing to search</div>

    //not found countries
    if (countries.length == 0) return <div>No countries found</div>

    //to many countries
    if (countries.length > 10)
        return <div>Too many matches, specify another filter</div>

    //only one searched
    if (countries.length == 1) {
        const country = countries[0]

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
                <img src={country.flags.png} alt="Flag" />
                <p></p>
                <h2>Weather in {countries[0].name.common}</h2>
                {weather && (
                    <div>
                        <p>Temperature: {weather.main.temp} Celsius</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt="img"
                        />
                        <p>Wind: {weather.wind.speed}</p>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div>
            {countries.map(country => (
                <div key={country.name.common}>
                    {country.name.common}{' '}
                    <button onClick={() => setSearchInput(country.name.common)}>
                        Show
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Board
