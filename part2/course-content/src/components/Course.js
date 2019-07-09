import React from 'react'

const Course = ({course}) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.exercises
    return(
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <p>total of {course.parts.reduce(reducer, 0)} exercises</p>
        </>
    )
}

const Header = ({name}) => <><h2>{name}</h2></>

const Content =({parts}) => parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)

export default Course