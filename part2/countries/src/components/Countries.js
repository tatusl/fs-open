import React, { useState } from 'react'
import BasicCountryData from './BasicCountryData'

const Countries = ({ countries, countryFilter }) => {
  const [visibleCountries, setVisibleCountries] = useState([])

  const filteredCountries = countries.filter(country => country.name.match(new RegExp(countryFilter, 'gi')))

  /*
   * Handles state change of visibleCountries according to button presses.
   * If country does not exist in array, adds the country to the array.
   * If country does exist in array, removes the country from the array
   */
  const handleShowCountryInfo = (country) => {
    const copy = [...visibleCountries].includes(country)
      ? [...visibleCountries].filter(i => i !== country)
      : [...visibleCountries, country]
    setVisibleCountries(copy)
  }

  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  if (filteredCountries.length === 1) {
    const selectedCountry = filteredCountries[0]
    return (
      <BasicCountryData country={selectedCountry} />
    )
  }

  return (
    <div>
      {filteredCountries
        .map(country =>
          <React.Fragment key={country.name}>
            {country.name}
            <button onClick={() => handleShowCountryInfo(country.name)}>show</button><br />
            {visibleCountries.includes(country.name) && <BasicCountryData country={country} />}
          </React.Fragment>
        )
      }
    </div>
  )
}

export default Countries
