import React from 'react';
import axios from 'axios';

const Weather = ({city, one, weather, setWeather}) => {
    if(one===false) return<></>
    let url=`http://api.apixu.com/v1/current.json?key=8eba4235bdfa453d808215208191007&q=${city}`
  
    if(weather===0) {
      axios.get(url)
      .then((response)=>{setWeather(response.data)})
        return<></>}
    return(
      <>
        <h2>Weather in {weather.location.name}</h2>
        <p><b>temperature:</b> {weather.current.temp_c} Celsius </p>
        <img className='img2' src={weather.current.condition.icon} alt={weather.current.condition.text} ></img>
        <p><b>wind:</b> {weather.current.wind_kph} kph direction {weather.current.wind_dir}</p>
      </>)
  }

  export default Weather