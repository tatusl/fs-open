import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = ({ text, value }) => (
  <p>{text} {value}</p>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good+neutral+bad
  const average = (good*1+neutral*0+bad*-1)/all
  const positive_percentage = (good/all)*100

  if (all === 0) {
    return (
      <div>
       <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
    <h1>statistics</h1>
    <Statistic text="good" value={good} />
    <Statistic text="neutral" value={neutral} />
    <Statistic text="bad" value={bad} />
    <Statistic text="all" value={all} />
    <Statistic text="average" value={average} />
    <Statistic text="positive" value={positive_percentage+'%'} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)