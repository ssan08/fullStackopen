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

const Display_countries = (props) => {
  const [showButton, setShowButton] = useState(false)
  const [nameS, setNameS] = useState('')
  const showClick = name => {
    setNameS(name)
    setShowButton(true)


  }


  const Countries = (props) => {
    return (
      <div>
        <ul>
          <Namesfilter filter={props.newFilter} countries={props.countries} api={props.api} />
        </ul>
      </div>
    )
  }

  const Namesfilter = (props) => {
    var val = props.countries.filter(note => note.name.toLowerCase().includes(props.filter.toString().toLowerCase()))
    if (showButton) {
      return (
        <div>
          <BasicData val={props.countries.filter(note => note.name.includes(nameS))} api={props.api} />
        </div>
      )
    }
    else {
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
            <BasicData val={val} api={props.api} />
          </div>
        )
      }
      else if (val.length > 0 && val.length <= 10) {
        return (
          val.map((note, i) => (
            <span key={i}>
              {note.name}
              <button onClick={() => showClick(note.name)}>show</button>
              <br />
            </span>
          ))
        )

      }
      else {
        return (
          <p> No match found</p>
        )
      }

    }
  }





  const BasicData = (props) => {
    const [weather, setWeather] = useState([])
    const params = {
      access_key: props.api,
      query: props.val[0].name
    }
    console.log(params)
    useEffect(() => {
      axios.get('http://api.weatherstack.com/current', { params })
        .then(response => {
          setWeather(response.data)
        })
    }, [])

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
        <WeatherData weather={weather}/>
      </div>
    )


  }

  const WeatherData = (props) => {
    if (props.weather.length === 0) {
      return (
        <p></p>
      )
    }
    else {
    return (
      <div>
        <h2> Weather in {props.weather.location.name}</h2>
        <p>Temperature: {props.weather.current.temperature} Celcius</p>
        <p>
          <img
            src={props.weather.current.weather_icons[0]} width={250} height={200} alt="weather" />
        </p>
        <p>Wind: {props.weather.current.wind_speed} mph direction {props.weather.current.wind_dir}</p>
      </div>
    )
    }

  }

const Language = (props) => {

  return (
    <li>{props.name}</li>
  )


}

return (
  <Countries newFilter={props.newFilter} countries={props.countries} api={props.api} />
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

      <Display_countries newFilter={newFilter} countries={countries} api={process.env.REACT_APP_API_KEY} />

    </div>
  )
}

export default App
