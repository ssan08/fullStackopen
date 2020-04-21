import React, { useState, useEffect } from 'react'
import axios from 'axios'



const Names = (props) => {
  if (props.newFilter.length === 0) {
    return (
      <li>{props.name} {props.number}</li>
    )
  }
  else {
    return (
      <p> </p>

    )
  }
}

const Filter = (props) => {
  return (
    <div>
      filter shown with: <input value={props.filter}
        onChange={props.handleFilterChange} />
    </div>
  )
}

const PersonForm = (props) => {
return (
<form onSubmit={props.addName}>
    <div>
      name: <input value={props.newName}
        onChange={props.handleNameChange} />
    </div>
    <div>
      number: <input value={props.newNumber}
        onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)
}

const Persons = (props) => {
return (
  <div>
  <ul>
    <Namesfilter filter={props.newFilter} persons={props.persons}/>
  </ul>
  <ul>
    {props.persons.map((note) =>
      <Names key={note.name} newFilter={props.newFilter} name={note.name} number={note.number} />
    )}
  </ul>
  </div>
)
}

const Namesfilter = (props) => {
  var val = props.persons.filter(note => note.name.toLowerCase().includes(props.filter.toString().toLowerCase()))
  return (
    <div>
      {val.map((note) =>
        <Namesfilterdisp key={note.name} name={note.name} number={note.number} newFilter={props.filter} />
      )}
    </div>
  )
}

const Namesfilterdisp = (props) => {
  if (props.newFilter.length > 0) {
    return (
      <li>{props.name} {props.number}</li>
    )
  }
  else {
    return (
      <p> </p>

    )
  }
}



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newNumber, setNewNumber] = useState('')


  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    let k = 0
    const arr_name = persons.map((note) => note.name)
    arr_name.forEach(function (item, index, array) {
      if (item === newPerson.name) {
        window.alert(`${newPerson.name} is already added to the phonebook`);
        k += 1
      }

    })
    if (k === 0) {
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
    setNewNumber('')

  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)


  }


return (
  <div>
    <h2>Phonebook</h2>
    <Filter filter={newFilter} handleFilterChange={handleFilterChange}/>
    <h3>Add a new</h3>
    <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
    <h3>Numbers</h3>
    <Persons newFilter={newFilter} persons={persons} />
  </div>
)
}

export default App
