import React from 'react';
import Weather from './Weather'

const AddCountry = ({id, country, one, setShow, show, weather, setWeather}) =>{
    let i=0;
    const handleClick = ()=>{
      let newShow=[...show]
      newShow[id]=1
      setShow(newShow)
    }
  
    if(one===false && show[id]===0) return (
      <>{country.name}  
      <button onClick={handleClick}>show</button><br/>
      </>
    )
    return(
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}<br/>
        population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {country.languages.map((language) => <li key={i++}>{language.name}</li>)}
        </ul>
        <img  src={country.flag} alt='flag' id='img1'/>
        <Weather city={country.capital} one={one} weather={weather} setWeather={setWeather}/>
      </div>
    )
}

export default AddCountry