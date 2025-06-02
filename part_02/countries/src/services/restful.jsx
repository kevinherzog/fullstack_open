import axios from "axios"
const api_key = import.meta.env.VITE_WEATHER_API_KEY

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getIcon = (icon) => {
    const request = axios.get(`https://openweathermap.org/img/wn/${icon}@2x.png`)
    return request.then(response => response.data)
}

const getWeather = (latlng) => {
    
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
}

export default { getAll , getWeather , getIcon }