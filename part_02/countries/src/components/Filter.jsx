import { useState , useEffect } from "react"

const Filter = ({ countries, setFilteredCountries, setCountries, filteredCountries }) => {
  const [search, setSearch] = useState('')

    useEffect(() => {
            setFilteredCountries(countries)
        }, [setFilteredCountries,countries])

  const searchCountries = (event) => {
    const value = event.target.value.toLowerCase()
    setSearch(value)

    if (value === "") {
      setFilteredCountries(countries)
    } else {
      const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(value)
      )
      setFilteredCountries(filtered)
    }
  }


  return (
        <div>
          filter shown with <input value={search} onChange={searchCountries} />
        </div>
  )
}

export default Filter