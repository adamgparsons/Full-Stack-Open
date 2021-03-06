const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config({ path: '.env' })
const Person = require('./models/person')
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(
  morgan(
    ':method :url  status :req[content-length] - :response-time ms :post-request-log'
  )
)

morgan.token('post-request-log', (req, ) => {
  if (('req', req.route.methods.post)) {
    return JSON.stringify(req.body)
  }
})

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((people) => {
    response.json(people.map((person) => person.toJSON()))
  })
})

app.get('/info', (req, res, next) => {
  Person.find({})
    .then((people) => {
      const numberOfPeople = people.length
      const date = new Date()
      res.send(
        `
    <p>Phone book has info for ${numberOfPeople} people </p>
    <p>${date}</p>
    `
      )
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const personId = request.params.id
  Person.findById(personId)
    .then((person) => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const updatedPerson = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, updatedPerson, {
    new: true,
  })
    .then((updatedPerson) => response.json(updatedPerson.toJSON()))
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedAndFormattedPerson) => response.json(savedAndFormattedPerson))
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
