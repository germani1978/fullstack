const Board = ({ countries, setSearchInput, isLoading }) => {
    if (isLoading) return <div>Loading ...</div>

    if (countries == null) return <div>Start typing to search</div>

    if (countries.length == 0) return <div>No countries found</div>

    if (countries.length > 10)
        return <div>Too many matches, specify another filter</div>

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
