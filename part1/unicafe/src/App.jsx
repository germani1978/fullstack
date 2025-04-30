import { useState } from 'react'

const Button = ({ text, handle }) => {
    return <button onClick={handle}>{text}</button>
}

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
    return (
        <>
            <h2>Statistics</h2>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {all}</p>
            <p>average {average()}</p>
            <p>positive {positive()}%</p>
        </>
    )
}

function App() {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)

    const handleGood = () => {
        setGood(good + 1)
        setAll(all + 1)
    }
    const handleNeutral = () => {
        setNeutral(neutral + 1)
        setAll(all + 1)
    }
    const handleBad = () => {
        setBad(bad + 1)
        setAll(all + 1)
    }

    const average = () =>
        all !== 0 ? (good * 1 + neutral * 0 + bad * -1) / all : 0

    const positive = () => (all !== 0 ? (good / all) * 100 : 0)

    return (
        <div>
            <h1>give feedback</h1>
            <Button text="good" handle={handleGood} />
            <Button text="neutral" handle={handleNeutral} />
            <Button text="bad" handle={handleBad} />

            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                all={all}
                average={average}
                positive={positive}
            />
        </div>
    )
}

export default App
