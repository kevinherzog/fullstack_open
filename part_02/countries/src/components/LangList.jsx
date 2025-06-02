const LangList = ({country}) => {
    if(!country) return null
    const languages = Object.values(country)
    
    return (
        <ul>
            {languages.map((lang, i) => (
                <li key={i}>{lang}</li>
            ))}
        </ul>
    )
}
export default LangList