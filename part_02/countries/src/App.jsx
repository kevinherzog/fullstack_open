import { useState , useEffect } from 'react'
import restful from './services/restful'
import Filter from './components/Filter'
import CountryList from './components/CountryList'

function App() {

  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    restful.getAll()
      .then(response => {
        setCountries(response)
        setFilteredCountries(response)
        }
      )
  },[])
  return (
    <div>
      <Filter countries={countries} setCountries={setCountries} filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries}></Filter>
      <CountryList countries={filteredCountries} setCountries={setCountries} />
    </div>
  )
}

export default App
