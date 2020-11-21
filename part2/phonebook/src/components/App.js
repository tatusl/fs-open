import React, { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const personExists = persons.some(person => person.name === personObject.name)
    personExists
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleNameFilter = (event) => setNameFilter(event.target.value)

  const nameFilterProps = {
    nameFilter,
    handleNameFilter
  }

  const personFormProps = {
    addPerson,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange
  }

  const personsProps = {
    persons,
    nameFilter
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter {...nameFilterProps} />
      <h3>Add a new</h3>
      <PersonForm  {...personFormProps}/>
      <h3>Numbers</h3>
      <Persons  {...personsProps}/>
    </div>
  )
}

export default App
