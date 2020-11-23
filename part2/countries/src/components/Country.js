import React, { useState } from 'react'
import BasicCountryData from './BasicCountryData'

const Country = ({ country }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <React.Fragment key={country.name}>
      {country.name}
      <button onClick={() => setShowDetails(!showDetails)}>show</button><br />
      {showDetails && <BasicCountryData country={country} />}
    </React.Fragment>

  )
}

export default Country
