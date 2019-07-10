import React from 'react'
import Person from './Person'

const DisplayPhonebook = ({persons, filter}) =>{
    const mapping = () => {return(
        (person)=>{
            let poweronLowercase = person.name.toLowerCase()
            let filterLowercase = filter.toLowerCase()
            if (poweronLowercase.search(filterLowercase)!==-1){
                return(<Person person={person} key={person.id} />)
            }
        }
    )
    }
    
    return(
        persons.map (mapping())
    )  
}
export default DisplayPhonebook