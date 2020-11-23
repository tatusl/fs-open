import React, { useState, useEffect } from 'react'
import Weather from './Weather'
import axios from 'axios'

const weatherstack_api_key = process.env.REACT_APP_WEATHERSTACK_API_KEY

const listStyle = {
  listStyle: 'none',
  paddingLeft: 0
}

/*
API response error handling is left intentionally out of scope for this exercise.
Works in most of the cases.
*/
const BasicCountryData = ({ country }) => {
  const [weather, setWeather] = useState(undefined)
  const apiURLEncoded = encodeURI(`http://api.weatherstack.com/current?access_key=${weatherstack_api_key}&query=${country.capital}`)

  useEffect(() => {
    axios
      .get(apiURLEncoded)
      .then(response => {
        setWeather(response.data)
      })
  }, [apiURLEncoded])

  return (
    <div>
      <h1>{country.name}</h1>
      <ul style={listStyle}>
        <li>capital {country.capital}</li>
        <li>population {country.population}</li>
      </ul>
      <h2>languages</h2>
      <ul>
      {country.languages.map(lang =>
        <li key={lang.name}>
          {lang.name}
        </li>
      )}
      </ul>
      <img src={country.flag} alt={`Flag of ${country.name}`} width="150"></img>
      <h2>{`Weather in ${country.capital}`}</h2>
      {weather ? <Weather weather={weather} /> : <h1>Loading weather data</h1>}
    </div>
  )
}

export default BasicCountryData
