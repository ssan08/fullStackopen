import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = (props) => {
  return (
    <div>
      find countries: <input value={props.filter}
        onChange={props.handleFilterChange} />
    </div>
  )
}


const Countries = (props) => {
  return (
    <div>
      <ul>
        <Namesfilter filter={props.newFilter} countries={props.countries} />
      </ul>
    </div>
  )
}

const Namesfilter = (props) => {
  var val = props.countries.filter(note => note.name.toLowerCase().includes(props.filter.toString().toLowerCase()))
  if (props.filter.length === 0) {
    return (
      <p>No filter mentioned </p>
    )
  }
  else if (val.length > 10) {
    return (
      <p> Too many matches, specify another filter </p>

    )
  }
  else if (val.length === 1) {
    return (
      <div>
        <BasicData val={val} />
      </div>
    )
  }
  else if (val.length > 0 && val.length <= 10) {
    return (
      <div>
        {val.map((note) =>
          <Namesfilterdisp key={note.name} name={note.name} capital={note.capital} population={note.population} languages={note.languages} flag={note.flag} />
        )}
      </div>
    )
  }
  else {
    return (
      <p> No match found</p>
    )
  }

}

const Namesfilterdisp = (props) => {


  return (
    <div>
      <li>{props.name}   </li>

    </div>

  )


}


const BasicData = (props) => {
  return (
    <div>
      <h1>{props.val[0].name}</h1>
      <p>Capital {props.val[0].capital}</p>
      <p>Population {props.val[0].population}</p>
      <h2>Languages</h2>
      <ul>
        {props.val[0].languages.map((note) =>
          <Language key={note.name} name={note.name} />
        )}
      </ul>
      <p>
        <img
          src={props.val[0].flag} width={250} height={200} alt="flag" />
      </p>
    </div>
  )


}

const Language = (props) => {

  return (
    <li>{props.name}</li>
  )


}


const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])


  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)


  }


  return (
    <div>
      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />

      <Countries newFilter={newFilter} countries={countries} />
    </div>
  )
}

export default App
