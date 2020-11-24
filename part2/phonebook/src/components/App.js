import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from '../services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
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
      const existingPerson = persons.filter(person => person.name === personObject.name)[0]
      const confirmMessage = `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
      const confirmDelete = window.confirm(confirmMessage)

      if (confirmDelete) {
        personService.update(existingPerson.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
        })
      }
    }
    else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleNameFilter = (event) => setNameFilter(event.target.value)

  const handlePersonDelete = (person) => {
    const confirmDelete = window.confirm(`Delete ${person.name}`)
    if (confirmDelete) personService
      .remove(person.id)
      .then(data => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
  }

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
    nameFilter,
    handlePersonDelete
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
