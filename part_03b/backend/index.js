const express = require('express')
var morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

morgan.token('body', (req) => JSON.stringify(req.body || {}))
var logger = morgan(':method :url :status :response-time ms :body')

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

app.delete('/api/persons/:id', (request, response) =>{
    const id = request.params.id
    persons = persons.filter(pers => pers.id !== id)

    response.status(204).end()
} )

const generateID = () => {
  const maxID = persons.length > 0
    ? Math.max(... persons.map(n=>Number(n.id)))
    : 0
    
  return String(maxID+ 1)
}

const generateIDTwo = () => {
  return String(Math.floor(Math.random() * 10000))
}

app.post('/api/persons', logger, (request, response) => {

  const body = request.body
  
  if (!body.name && !body.number) {
    return response.status(400).json({ 
      error: 'name and number missing' 
    })
  } else if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  } else if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  } else if (persons.some(p => p.name === body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateIDTwo(),
  }

  persons = persons.concat(person)
  response.json({ok: true})
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})