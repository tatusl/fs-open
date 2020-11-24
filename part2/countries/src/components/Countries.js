import React from 'react'
import BasicCountryData from './BasicCountryData'
import Country from './Country'

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
    <div>
      {filteredCountries
        .map(country =>
          <Country key={country.name} country={country} />
        )
      }
    </div>
  )
}

export default Countries
