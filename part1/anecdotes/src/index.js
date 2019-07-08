import React, { useState } from 'react'
import ReactDOM from 'react-dom'

var maxLoc = 0
const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
}

const random=(num)=>{
    return(Math.floor(num*Math.random()))
}

const App = (props) => {
  const votesInit = new Uint8Array(anecdotes.length); 
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(votesInit)
  const setToSelected = num=>setSelected(num)
  const setToVotes = index => {
    if(votes[index]===votes[maxLoc]) maxLoc=index
    const copyVotes={ ...votes,  [index]:votes[index]+1}
    setVotes(copyVotes)
    }

  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <Button handleClick={()=>setToVotes(selected)} text={'vote'}/>
      <Button handleClick={()=>setToSelected(random(anecdotes.length))} text={'next anecdote'}/>
      <br/>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[maxLoc]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)