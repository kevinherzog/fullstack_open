import { useEffect, useState } from 'react'
import NameList from './components/NameList.jsx'
import PersonForm from './components/PersonForm.jsx'
import Filter from './components/Filter.jsx'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([])
  const [filtered, setFiltered] = useState([])

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
      <Filter persons={persons} filtered={filtered} setFiltered={setFiltered}/>
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons}/>
      <h3>Numbers</h3>
      <NameList persons={filtered} />
    </div>
  )
}



export default App