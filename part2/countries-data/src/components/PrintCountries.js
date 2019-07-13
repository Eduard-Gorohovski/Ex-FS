import React from 'react';
import AddCountry from './AddCountry'

const PrintCountries = ({countries, filter, setShow, show, weather, setWeather}) => {
    let i=0
    const filterCountries = (countries, filter) => {
        const filterLowercase=filter.toLowerCase()
        const filteredCountries=[]
        countries.forEach( country => {
        if(country.name.toLowerCase().search(filterLowercase) !== -1){
            filteredCountries.push(country)
        }
        })
        return filteredCountries
    }
    if(filter === '') {return (<PrintTooMany />)}

    const filteredCountries=filterCountries(countries, filter)

    if(filteredCountries.length > 10) {return (<PrintTooMany />)}
    return filteredCountries.map((country) => <AddCountry key={i} id={i++} country={country} one={filteredCountries.length===1}
                                                                    setShow={setShow} show={show} weather={weather} setWeather={setWeather}/>)
}
  
const PrintTooMany = () => <p>Too many matches, specify another filter</p>

export default PrintCountries