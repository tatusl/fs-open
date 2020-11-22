import React from 'react'

const listStyle = {
  listStyle: 'none',
  paddingLeft: 0
}

const BasicCountryData = ({ country }) => {
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
    </div>
  )
}

export default BasicCountryData
