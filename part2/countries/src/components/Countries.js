import React from 'react'
import BasicCountryData from './BasicCountryData'

const countryListStyle = {
  listStyle: 'none',
  paddingLeft: 0
}

const Countries = ({ countries, countryFilter }) => {
  const filteredCountries = countries.filter(country => country.name.match(new RegExp(countryFilter, 'gi')))

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
    <ul style={countryListStyle}>
    {filteredCountries
      .map(country =>
        <li key={country.name}>
          {country.name}
        </li>
      )
    }
    </ul>
  )
}

export default Countries
