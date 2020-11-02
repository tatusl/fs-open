import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
    <div>
      <h1>{props.course}</h1>
    </div>
)

const Part = (props) => (
  <>
    <p>
      {props.part_name} {props.exercise_count}
    </p>
  </>
)

const Content = (props) => (
  <div>
      <Part part_name={props.part1.name} exercise_count={props.part1.exercises} />
      <Part part_name={props.part2.name} exercise_count={props.part2.exercises} />
      <Part part_name={props.part3.name} exercise_count={props.part3.exercises} />
  </div>
)

const Total = (props) => (
  <>
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  </>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))