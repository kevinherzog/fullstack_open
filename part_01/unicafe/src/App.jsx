const Header = (props) => {
  return(
    <h1>{props.course}</h1>
  )
}
const Content = (props) => {
  return( 
    <div>
      <Part p={props.parts[0].name} e={props.parts[0].exercises}/>
      <Part p={props.parts[0].name} e={props.parts[1].exercises}/>
      <Part p={props.parts[0].name} e={props.parts[2].exercises}/>
    </div>
  )
}
const Total = (props) => {
  return(
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

const Part = (props) => {
  return(
    <p>
    {props.p} {props.e}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App