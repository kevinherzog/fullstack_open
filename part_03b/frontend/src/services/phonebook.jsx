import axios from "axios"
const baseUrl = "http://localhost:3001/persons"
const create = newEntry => {
    const request = axios.post(baseUrl, newEntry)
    return request.then(response => response.data)
}

const update = ( id, newEntry ) => {
    const request = axios.put(`${baseUrl}/${id}`, newEntry)
    return request.then(response => response.data)
}

const removeObj = entryId => {
    
    const request = axios.delete(`${baseUrl}/${entryId}`)
    return request.then(response => response.data)
}
export default { create , removeObj , update }