import React from 'react'

function tot(t, num) {
  return t + num;
}
const Total = (props) => {

  const exer = props.part.map(note => note.exercises)
  const sum = exer.reduce(tot)
  return (
    <p>total of {sum} exercises</p>
  )
}

const Part = (props) => {
  return (
    <div>
      {props.part.map(note =>
        <p key={note.id}>
          {note.name} {note.exercises}
        </p>
      )}
    </div>
  )
}

const Content = ( props ) => {
  return (
    <div>
      <Part part={props.parts} />
      <Total part={props.parts} />
    </div>
  )
}
const DisplayHeader = (props) => {
  return (
    <h1>
      {props.name}
    </h1>
  )
}
const Header = ({ course }) => {
  return (

    
      course.map(note =>
        <div>
          <DisplayHeader name={note.name} />
          <Content parts={note.parts} />
        </div>
      )
    

  )
}


const Course = ({ course }) => {
  return (
    <div>
      <Header course={course}/>
    </div>
  )
}

export default Course
