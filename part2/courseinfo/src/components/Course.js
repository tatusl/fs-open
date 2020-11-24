import React from 'react'

const Header = ({ course_name }) => {
    return (
      <h1>{course_name}</h1>
    )
  }

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(
          part => <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <p><b>total of {total} exercises</b></p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course_name={course.name} />
      <Content course={course} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
