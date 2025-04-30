import { useState } from 'react'

const Button = ({ text, handle }) => {
    return <button onClick={handle}>{text}</button>
}

function App() {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <Button text="good" handle={() => setGood(good + 1)} />
            <Button text="neutral" handle={() => setNeutral(neutral + 1)} />
            <Button text="bad" handle={() => setBad(bad + 1)} />

            <h2>Statistics</h2>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
        </div>
    )
}

export default App
