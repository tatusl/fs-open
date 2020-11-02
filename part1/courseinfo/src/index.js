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
      <Part part_name={props.part1} exercise_count={props.exercises1} />
      <Part part_name={props.part2} exercise_count={props.exercises2} />
      <Part part_name={props.part3} exercise_count={props.exercises3} />
  </div>
)

const Total = (props) => (
  <>
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  </>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))