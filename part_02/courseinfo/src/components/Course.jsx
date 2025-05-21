
const Course = ({course}) => {
    return(
      course.map((course) => 
        <div key={course.id}>
          <Header name = {course.name} />    
          <Content parts = {course.parts} />
          <Total course = {course.parts} />
        </div>)
    )
  }
  const Header = ({name}) => <h1>{name}</h1>


  const Content = ({parts}) => {
    return (parts.map((parts, i) => 
      <Part key = {i} name = {parts.name} exercises = {parts.exercises} />))
  }
  
  const Part = ({name, exercises}) => (
    <p>
      {name} {exercises}
    </p>
  )
  
  const Total = ({course}) => {
    const total = course.reduce((a, s) => {
      return a + s.exercises
    },0
    )
    return <p style={{fontWeight: "bold"}}>total of exercises {total}</p>
  }
  export default Course