import { useState } from 'react'

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, count}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{count}</td>
    </tr>
  )
}
const Statistics = ({good,neutral,bad,sumAll,average,percentage}) => {
  if (sumAll === 0) {
    return(
      <div>
        No feedback given
      </div>
    )
  }else{
    return(
      <table>
        <tbody>
        <StatisticLine text="good" count={good} />
        <StatisticLine text="neutral" count={neutral} />
        <StatisticLine text="bad" count={bad} />
        <StatisticLine text="all" count={sumAll} />
        <StatisticLine text="average" count={average} />
        <StatisticLine text="positive" count={percentage} />
        </tbody>
      </table>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const sumAll = good+bad+neutral
  const calcAverage = () => ((good + bad*-1)/sumAll).toFixed(1)
  const calcPositive = () => (good / sumAll * 100).toFixed(1) + "%"

  return (
    <div>
      <h1>give feedback</h1>
      <Button 
        onClick={() => setGood(good+1)}
        text="good"
        />
      <Button 
        onClick={() => setNeutral(neutral+1)}
        text= "neutral"
        />
      <Button 
        onClick={() => setBad(bad+1)}
        text = "bad"
        />    
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} sumAll={sumAll} average={calcAverage()} percentage={calcPositive()}/>
    </div>
  )
}

export default App