const express = require('express')
var morgan = require('morgan')
const mongo = require('./modules/mongo.js')

const app = express()

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body || {}))
const logger = morgan(':method :url :status :response-time ms :body')
app.use(morgan('tiny'))

let persons = [] //place holder for rewriting

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const d = new Date('2022-01-22T20:27:20.000Z'); // example date
    const formatted = d.toString();
    mongo.getAllEntries()
      .then(persons => {
        const msg = `<div>Phonebook has info for ${persons.length} people.</div><br /><div>${formatted}</div>`
        response.send(msg)
      })
})

app.get('/api/persons', (request, response) => {
  mongo.getAllEntries()
    .then(persons => {
      response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
   mongo.findById(request.params.id)
    .then(person =>{
      if (person) {    
          response.json(person)
      } else {    
          response.status(404).end()  
      }
    })
})

app.delete('/api/persons/:id', (request, response) =>{
    const id = request.params.id
    persons = persons.filter(pers => pers.id !== id)

    response.status(204).end()
} )

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

  mongo.createContact( {name: body.name, number: body.number })
    .then(saved => {
      response.json(saved)
    })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})