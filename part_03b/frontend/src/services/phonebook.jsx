import axios from "axios"
const baseUrl = "/api/persons"
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