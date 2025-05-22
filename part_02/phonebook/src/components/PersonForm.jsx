import { useState } from 'react'

const PersonForm = ({persons, setPersons}) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    
    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }
        if (persons.some((person) => person.name === personObject.name)) {
            window.alert(`${personObject.name} is already added to the phonebook!`)
        }else{
            setPersons(persons.concat(personObject))
        }
  }

  const addNewName = (event) => {
    setNewName(event.target.value)
  }

  const addNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
    return(
        <div>
            <form onSubmit={addPerson} >
                <div>
                    name: <input value={newName} onChange={addNewName}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={addNewNumber}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm