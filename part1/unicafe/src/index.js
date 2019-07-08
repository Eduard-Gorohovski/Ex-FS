import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return(
        <>
            <h1>{props.headline}</h1>
        </>
    )
}

const Button = (props) => {
    return(
        <button onClick={props.function}>
            {props.text}
        </button>

    )
}


const DisplayAttribute = (props) => {
    return(
        <>
            <p>{props.attribute} {props.result}</p>
        </>
    )
}

const Statistics = ({good, neutral, bad}) => {
    const all=good+neutral+bad
    return(
        <>
            <Header headline='statistics' />
            <DisplayAttribute attribute="good" result={good} />
            <DisplayAttribute attribute="neutral" result={neutral} />
            <DisplayAttribute attribute="bad" result={bad} />
            <DisplayAttribute attribute="all" result={all} />
            <DisplayAttribute attribute="average" result={(good-bad)/all} />
            <DisplayAttribute attribute="positive" result={100*(good)/all + " %"} />
        </>
    )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const headline='give feedback'
  return (
    <div>
        <Header headline={headline} />
        <Button function={()=>{setGood(good+1)}} text='good'/>
        <Button function={()=>{setNeutral(neutral+1)}} text='neutral'/>
        <Button function={()=>{setBad(bad+1)}} text='bad'/>
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)