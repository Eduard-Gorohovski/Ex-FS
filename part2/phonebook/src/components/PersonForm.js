import React from 'react'

const PersonForm = (props) =>{
    return(
      <form onSubmit={props.addPerson}>
          <div>
            name: <input 
              value={props.newPerson.name}
              onChange={props.handleNameChange} />
          </div>
          <div>number: <input 
              value={props.newPerson.number}
              onChange={props.handleNumberChnage}  />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
}
export default PersonForm