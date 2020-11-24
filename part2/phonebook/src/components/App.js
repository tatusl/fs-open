import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const personExists = persons.some(person => person.name === personObject.name)

    if (personExists) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      axios.post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
      })
    }
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
