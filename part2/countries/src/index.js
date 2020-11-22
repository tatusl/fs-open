import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleCountryFilter = (event) => setCountryFilter(event.target.value)

  return (
    <div>
      <Filter
        countryFilter={countryFilter}
        handleCountryFilter={handleCountryFilter}
      />
      <Countries
        countries={countries}
        countryFilter={countryFilter}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
