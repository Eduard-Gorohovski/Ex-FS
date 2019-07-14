import React, { useState, useEffect } from 'react'
import DisplayPhonebook from './components/DisplayPhonebook'
import PersonForm from './components/PersonForm'
import phoneService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ filter, setFilter ] = useState('')
  const [ newPerson, setNewPerson ] = useState({name: '', number: '', id: 0})

  const hook = () => {phoneService.getAll()
                    .then( response => {
                      setNewPerson({name: '', number: '', id: 1+Math.max(...response.map(elem => elem.id))})
                      setPersons(response)})}
  useEffect(hook, [])

  const addPerson = (event) =>{
    event.preventDefault()
    const responsefunction = (response)=>{
      setPersons(persons.concat({ name: response.name, number: response.number, id: response.id}))
    }
    let tmpPerson
    const findMatch = ()=>{
      tmpPerson=persons.find( (person) => person.name === newPerson.name)
      if(tmpPerson) return true
      return false
    }

    
    if(findMatch()){
        const confirm = window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)
        if(confirm === true){
          const person={
            name: newPerson.name,
            number: newPerson.number, 
            id: newPerson.id
          }
          phoneService.update(tmpPerson.id, person).then((response)=>{
            setNewPerson({name: '', number: '', id: newPerson.id+1})
            setPersons(persons.map(elem => elem.id===tmpPerson.id ? response : elem))
          })
        }
    }
    else{
      const person={
        name: newPerson.name,
        number: newPerson.number, 
        id: newPerson.id
      }
      setNewPerson({name: '', number: '', id: newPerson.id+1})
      phoneService.create(person)
           .then(responsefunction)
    }
  }

  const deleteButtonHandle = (person) => ()=>{
    phoneService.remove(person.id).then((response) =>{
      const otherPersons = persons.filter( elem => elem !== person)
      setPersons(otherPersons)
    })
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
      <DisplayPhonebook persons={persons} filter={filter} deleteButtonHandle={deleteButtonHandle} />
    </div>
  )
}

export default App