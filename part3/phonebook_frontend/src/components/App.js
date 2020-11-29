import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from '../services/persons'
import Notification from './Notification'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notification, setNotification] = useState({message: null, type: null})

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const triggerNotification = (message, type) => {
    setNotification({message: message, type: type})
    setTimeout(() => {
      setNotification({message: null})
    }, 2000)
  }

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
      const confirmChange = window.confirm(confirmMessage)

      if (confirmChange) {
        personService.update(existingPerson.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            triggerNotification(`Changed ${returnedPerson.name}'s number`, 'info')
          })
          .catch(error => {
            triggerNotification(error.response.data.error, 'error')
          })
      }
    }
    else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          triggerNotification(`Added ${returnedPerson.name}`, 'info')
        })
        .catch(error => {
          triggerNotification(error.response.data.error, 'error')
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
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
      .catch(() => {
        triggerNotification(`Information of ${person.name} has already been removed from the server`, 'error')
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
      <Notification notification={notification} />
      <Filter {...nameFilterProps} />
      <h3>Add a new</h3>
      <PersonForm  {...personFormProps}/>
      <h3>Numbers</h3>
      <Persons  {...personsProps}/>
    </div>
  )
}

export default App
