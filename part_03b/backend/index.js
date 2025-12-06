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

app.get('/info', (request, response, next) => {
    const d = new Date('2022-01-22T20:27:20.000Z'); // example date
    const formatted = d.toString();
    mongo.getAllEntries()
      .then(persons => {
        const msg = `<div>Phonebook has info for ${persons.length} people.</div><br /><div>${formatted}</div>`
        response.send(msg)
      })
      .catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
  mongo.getAllEntries()
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
   mongo.findById(request.params.id)
    .then(person =>{
      if (person) {    
          response.json(person)
      } else {    
          response.status(404).end()  
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) =>{
    mongo.deleteById(request.params.id)
      .then(response.status(204).end())
      .catch(error => next(error))
} )

app.post('/api/persons', logger, (request, response, next) => {

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
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  mongo.updateById(request.params.id, { name, number })
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson)
      } else {
        response.status(404).end()
      }
    })
    .catch(next)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message }) 
  }
  next(error)
}
// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})