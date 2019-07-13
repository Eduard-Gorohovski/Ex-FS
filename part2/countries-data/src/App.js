import React, {useState, useEffect} from 'react';
import PrintCountries from './components/PrintCountries'
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

export default App