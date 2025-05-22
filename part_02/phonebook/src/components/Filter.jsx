import { useState, useEffect } from "react"

const Filter = ({persons, filtered, setFiltered}) => {
    const [search, setSearchTerm] = useState('')
    useEffect(() => {
        setFiltered(persons)
    }, [setFiltered])

    const searchPerson = (event) => {
        setSearchTerm(event.target.value)
        if (event.target.value == "") {
            setFiltered(persons)
        }else{
            setFiltered(persons.filter(perso => (perso.name).toLowerCase().includes(event.target.value)))
            console.log(filtered);
            
        }
        
    }

    return(
        <div>
            filter shown with <input value={search} onChange={searchPerson}/>
        </div>
    )
}
export default Filter