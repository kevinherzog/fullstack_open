import personService from '../services/phonebook'

const NameList = ({ persons , setPersons }) => {

  const deleteNum = (id) => {
    const toDeleteName = persons.find(person => person.id == id)
    
    if(window.confirm(`Delete ${toDeleteName.name} ?`)){
      personService
      .removeObj(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  } 

  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          <div>{person.name} {person.number}
          <button onClick={() => deleteNum(person.id)}>Delete</button></div>
        </div>
      ))}
    </div>
  )
}
export default NameList