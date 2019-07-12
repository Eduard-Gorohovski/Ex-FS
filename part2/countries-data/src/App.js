import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css'
var maxCountries = 10

function App() {
  const [ filter, setFilter ] = useState('')
  const [ countries, setCountries] = useState([])
  const [ show, setShow ] = useState(new Uint8Array(maxCountries))
  const [ weather, setWeather] = useState(0)

  const hook = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
        .then((response) => {setCountries(response.data)})
  }
  useEffect(hook,[])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setShow(new Uint8Array(maxCountries))
    setWeather(0)
  }

  return(
    <div>
      <div>
        <>find countries </> 
        <input 
          value={filter}
          onChange={handleFilterChange}/>
      </div>
      <PrintCountries countries={countries} filter={filter} setShow={setShow} show={show} weather={weather} setWeather={setWeather}/>
    </div>)
}

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

const Weather = ({city, one, weather, setWeather}) => {
  if(one===false) return<></>
  let url=`http://api.apixu.com/v1/current.json?key=8eba4235bdfa453d808215208191007&q=${city}`

    
  if(weather===0) {
    axios.get(url)
    .then((response)=>{setWeather(response.data)})
      return<></>}
  console.log(weather)
  return(
    <>
      <h2>Weather in {weather.location.name}</h2>
      <p><b>temperature:</b> {weather.current.temp_c} Celsius </p>
      <img className='img2' src={weather.current.condition.icon} alt={weather.current.condition.text} ></img>
      <p><b>wind:</b> {weather.current.wind_kph} kph direction {weather.current.wind_dir}</p>
    </>)
}


export default App