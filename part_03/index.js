const express = require('express')
const app = express()

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
app.get('/info', (request, response) => {
    const d = new Date('2022-01-22T20:27:20.000Z'); // example date
    const formatted = d.toString();
    const msg = `<div>Phonebook has info for ${persons.length} people.</div><br /><div>${formatted}</div>`
  response.send(msg)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(pers => pers.id === id)

    if (person) {    
        response.json(person)
    } else {    
        response.status(404).end()  
    }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})