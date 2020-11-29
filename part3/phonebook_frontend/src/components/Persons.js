import React from 'react'

const listStyle = {
  listStyle: 'none',
  paddingLeft: 0
}

const Persons = ({ persons, nameFilter, handlePersonDelete }) => {
  return (
    <ul style={listStyle}>
      {persons.filter(person => person.name.match(new RegExp(nameFilter, 'gi')))
        .map(person =>
          <li key={person.name}>
            {person.name} {person.number}
            <button onClick={() => handlePersonDelete(person)}>delete</button>
          </li>
        )
      }
    </ul>
  )
}

export default Persons
