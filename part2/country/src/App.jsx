import axios from 'axios'
import { useEffect, useState } from 'react'
import Board from './components/Board'

function App() {
    const [countries, setCountries] = useState(null)
    const [searchInput, setSearchInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getData = () => {
            //init
            if (searchInput.trim() == '') {
                setCountries(null)
                return
            }

            //loading countries
            setIsLoading(true)
            axios
                .get(`https://restcountries.com/v3.1/name/${searchInput}`)
                .then(response => setCountries(response.data))
                .catch(err => {
                    //no one came for server for filter
                    if (err.response.status == 404) {
                        setCountries([])
                    } else console.log(err.message)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }

        //evoid to many request to server
        const debounce = setTimeout(getData, 500)
        return () => clearTimeout(debounce)
    }, [searchInput])

    const handleInput = e => setSearchInput(e.target.value)

    return (
        <div>
            <p>
                find countries:{' '}
                <input
                    onChange={handleInput}
                    value={searchInput}
                    placeholder="Search..."
                />
            </p>

            <Board
                countries={countries}
                setSearchInput={setSearchInput}
                isLoading={isLoading}
            />
        </div>
    )
}

export default App
