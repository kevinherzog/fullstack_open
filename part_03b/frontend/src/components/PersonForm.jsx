import { useState } from 'react'
import personService from '../services/phonebook'

const PersonForm = ({persons, setPersons , setErMessage , setMessageType }) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    
    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber,
            id: `${persons.length}`
        }
        if (persons.some((person) => person.name === personObject.name)) {
            const oldNum = persons.find((person) => person.name === personObject.name)            
            if (oldNum.number !== personObject.number ) {
                if (window.confirm(`${oldNum.name} is already added to phonebook, replace the old number with new one?`)) {
                    personObject.id = oldNum._id
                    personService.update(personObject.id,personObject)
                        .then(response => {
                            setPersons(persons.map(person => person._id !== personObject.id ? person : response))
                            setNewName('')
                            setNewNumber('')
                            setMessageType(true)
                            setErMessage(`Updated Phonenumber of ${personObject.name}`)
                        })
                        .catch((event) => {
                            setMessageType(false)
                            setErMessage(`Information of ${personObject.name} has already  been removed from server.`)
                        })
                }
            }else{
                window.alert(`${personObject.name} is already added to the phonebook!`)
            }
        }else{
            personService
            .create(personObject)
            .then(response => {
                setPersons(persons.concat(response))
                setNewName('')
                setNewNumber('')
                setMessageType(true)
                setErMessage(`Added ${personObject.name}`)
            })
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