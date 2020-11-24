import React, { useState } from 'react'
import BasicCountryData from './BasicCountryData'

const Country = ({ country }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      {country.name}
      <button onClick={() => setShowDetails(!showDetails)}>show</button><br />
      {showDetails && <BasicCountryData country={country} />}
    </>
  )
}

export default Country
