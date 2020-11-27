const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

const morgan_post_logging_format =
  ':method :url :status :res[content-length] - :response-time ms :post_request_data'

morgan.token('post_request_data', (req) => {
  return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.json())

app.use(
  morgan('tiny', {
    skip: (req) => {
      return req.method === 'POST'
    },
  })
)

app.use(
  morgan(morgan_post_logging_format, {
    skip: (req) => {
      return req.method !== 'POST'
    },
  })
)

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
]

const generateId = () =>
  Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER))

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons/', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name is missing',
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number is missing',
    })
  }

  if (persons.some((person) => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique',
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

app.get('/info', (request, response) => {
  const response_msg = `Phonebook has info for ${persons.length} people <br/>
    <br/>
    ${new Date().toString()}`
  response.send(response_msg)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
