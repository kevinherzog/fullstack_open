import { useEffect, useState } from 'react'
import NameList from './components/NameList.jsx'
import PersonForm from './components/PersonForm.jsx'
import Filter from './components/Filter.jsx'
import Notification from './components/Notification.jsx'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([])
  const [filtered, setFiltered] = useState([])
  const [erMessage, setErMessage] = useState(null)
  const [messageType, setMessageType] = useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      }
      )
  },[])
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={erMessage} messageType={messageType}/>
      <Filter persons={persons} filtered={filtered} setFiltered={setFiltered} setErMessage={setErMessage} setMessageType={setMessageType}/>
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons}  setErMessage={setErMessage} setMessageType={setMessageType}/>
      <h3>Numbers</h3>
      <NameList persons={filtered} setPersons={setPersons} />
    </div>
  )
}



export default App