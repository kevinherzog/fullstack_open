import { useState , useEffect } from "react";
import restful from "../services/restful"
import LangList from "./LangList"


const NameList = ({ countries , setCountries }) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [weather, setWeather] = useState(null);
    const [icon, setIcon] = useState(null);
    
  useEffect(() => {
    if (selectedCountry) {
      restful.getWeather(selectedCountry.latlng)
        .then(data => {
          setWeather(data);
          return restful.getIcon(data.weather[0].icon);
        })
        .then(iconUrl => {
          console.log(iconUrl);
          
          setIcon(iconUrl);
        })
        .catch(err => console.error("Error fetching weather/icon:", err));
    }
  }, [selectedCountry]);

    const showCountry = (countryId) => {
        const country = countries.filter((count) => count.cca2 === countryId)
        setSelectedCountry(country[0])
    
  }

  const showThis = (country) => {
    
    return (
        <div>
            <h1>
                {country.name.common}
            </h1>
            <div>Capital {country.capital}</div>
            <div>Area {country.area} </div>
            <h2>Languages</h2>
            <LangList country={country.languages}></LangList>
            <img src={country.flags.png} alt={country.flags.alt} />
            <h2>Weather in {country.capital}</h2>
            {weather ? (
          <>
            <div>Temperature: {weather.main.temp} °C</div>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
            <div>Wind: {weather.wind.speed} m/s</div>
          </>
        ) : (
          <div>Loading weather...</div>
        )}           
        </div>
      )
  }
  
    if (countries.length > 10) {
        return <div> Too many matches, specify another filter </div>
    }else if (countries.length == 1){
        const country = countries[0];

        if (!selectedCountry || selectedCountry.cca2 !== country.cca2) {
          setSelectedCountry(country); 
        }

        return selectedCountry ? showThis(selectedCountry) : <div>Loading...</div>;

  }

  return (
    <div>
      {countries.map((country) => (
        <div key={country.cca2}>
          <div>{country.name.common} 
            <button onClick={() => showCountry(country.cca2)}>Show</button>
          </div>
        </div>
      ))}

      {
        selectedCountry && showThis(selectedCountry)
      }
    </div>
  )
}
export default NameList