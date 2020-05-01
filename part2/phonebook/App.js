import React, { useState, useEffect } from 'react'
import personService from './services/notes'
import './index.css'

const Notification = (props) => {
  console.log(props.no)
  if (props.message === null) {
    return null
  }
  else if (props.no === 0) {
    return (
      <div className="msg">
        {props.message}
      </div>
    )
  }
  else {
    return (
      <div className="error">
        {props.message}
      </div>
    )
  }

}

const Names = (props) => {

  const [delButton, setDelButton] = useState(false)
  const [id, setID] = useState(0)
  const name = props.name
  const delClick = id => {
    console.log(id)
    if (window.confirm(`Delete ${name} ?`)) {
      setID(id)
      setDelButton(true)
    }
  }
  if (delButton) {
    personService
      .delName(id)
    setID(0)
    setDelButton(false)
    window.alert(`${name} Deleted`)
    window.location.reload(true);
  }
  else {


    if (props.newFilter.length === 0) {

      return (
        <li> {props.name} {props.number}
          <button onClick={() => delClick(props.id)}>delete</button>
        </li>
      )

    }
    else {
      return (
        <p> </p>

      )
    }
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
        <Namesfilter filter={props.newFilter} persons={props.persons} />
      </ul>
      <ul>
        {props.persons.map((note) =>
          <Names key={note.name} newFilter={props.newFilter} name={note.name} number={note.number} id={note.id} />
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
        <Namesfilterdisp key={note.name} name={note.name} number={note.number} newFilter={props.filter} id={note.id} />
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
  const [message, setMessage] = useState(null)
  const [err, seterr] = useState(0)



  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons.data)
      })
  }, [])


  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    let k = 0
    let u = 0

    const arr_name = persons.map((note) => note.name)
    arr_name.forEach(function (item, index, array) {
      if (item === newPerson.name) {
        if (window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
          for (let index = 0; index < persons.length; index++) {
            const element = persons[index].name;
            if (element == newPerson.name) {
              const arr_id = persons[index].id
              personService
                .update(arr_id, newPerson)
                .catch(error => {
                  seterr(1)
                  setMessage(`Information of '${newPerson.name}' has already been removed from the server`)
                })
              k += 1
              u = 1



            }

          }



        }
        else {
          k += 1
        }

      }

      if (u === 1 && err === 0) {
        console.log(err)
        setMessage(`${newPerson.name} updated`)
        setTimeout(function () {
          document.location.reload()
        }, 2000);

      }

    })
    if (k === 0) {

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson.data))

        })
      setMessage(`${newPerson.name} added`)
      setTimeout(function () {
        document.location.reload()
      }, 2000);
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
      <Notification message={message} no={err} />
      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons newFilter={newFilter} persons={persons} />
    </div>
  )
}

export default App
