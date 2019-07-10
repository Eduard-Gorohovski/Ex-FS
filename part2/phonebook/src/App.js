import React, { useState, useEffect } from 'react'
import DisplayPhonebook from './components/DisplayPhonebook'
import PersonForm from './components/PersonForm'
import axios from 'axios'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ filter, setFilter ] = useState('')
  const [ newPerson, setNewPerson ] = useState({name: '', number: '', id: 0})

  const hook = () => {axios
                    .get('http://localhost:3001/persons')
                    .then( response => {
                      setNewPerson({name: '', number: '', id: 1+Math.max(...response.data.map(elem => elem.id))})
                      setPersons(response.data)
                    }
                    )}
  useEffect(hook, [])

  const addPerson = (event) =>{
    event.preventDefault()
    if(persons.find( (person) => person.name === newPerson.name)){
        window.alert(`${newPerson.name} is already added to phonebook`)
    }
    else{
        setPersons(persons.concat({ name: newPerson.name, number: newPerson.number, id: newPerson.id}))
        setNewPerson({name: '', number: '', id: newPerson.id+1})
    }
  }

  const handleFilterChange = (event) =>{
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewPerson({name: event.target.value, number: newPerson.number, id: newPerson.id})
  }

  const handleNumberChnage = (event) => {
    setNewPerson({name: newPerson.name, number: event.target.value, id: newPerson.id})
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input 
        value={filter}
        onChange={handleFilterChange}  />
      </div>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newPerson={newPerson} handleNameChange={handleNameChange} handleNumberChnage={handleNumberChnage}/>
      <h3>Numbers</h3>
      <DisplayPhonebook persons={persons} filter={filter} />
    </div>
  )
}

export default App