import React from 'react'

const Person = ({person, deleteButtonHandle}) => {
    return(
        <p>{person.name} {person.number} <button onClick={deleteButtonHandle(person)} >delete</button></p>
    )
}

export default Person