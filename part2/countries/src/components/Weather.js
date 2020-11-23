import React from 'react'

const Weather = ({ weather }) => {
  return (
    <div>
      {console.log.weather}
      <b>temperature:</b> {`${weather.current.temperature} Celsius`}<br />
      <img src={weather.current.weather_icons} alt={`Weather icon for ${weather.location.name} in ${weather.location.country}`} width="150"></img><br />
      <b>wind:</b> {`${weather.current.wind_speed} km/h direction ${weather.current.wind_dir }`}
    </div>
  )
}

export default Weather
