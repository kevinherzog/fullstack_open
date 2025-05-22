const NameList = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.name}>{person.name} {person.number}</div>
      ))}
    </div>
  )
}
export default NameList