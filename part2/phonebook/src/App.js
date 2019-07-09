import React, { useState } from 'react'
import DisplayPhonebook from './components/DisplayPhonebook'
import PersonForm from './components/PersonForm'


const App = () => {
    
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '' }
  ]) 
  const [ newPerson, setNewPerson ] = useState({name: '', number: ''})
  const [filter, setFilter] = useState('')

  const addPerson = (event) =>{
    event.preventDefault()
    if(persons.find( (person) => person.name === newPerson.name)){
        window.alert(`${newPerson.name} is already added to phonebook`)
    }
    else{
        setPersons(persons.concat({ name: newPerson.name, number: newPerson.number}))
        setNewPerson({name: '', number: ''})
    }
  }

  const handleFilterChange = (event) =>{
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewPerson({name: event.target.value, number: newPerson.number})
  }

  const handleNumberChnage = (event) => {
    setNewPerson({name: newPerson.name, number: event.target.value})
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