const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(
  morgan(
    ':method :url  status :req[content-length] - :response-time ms :post-request-log'
  )
);

morgan.token('post-request-log', (req, res) => {
  if (('req', req.route.methods.post)) {
    return JSON.stringify(req.body);
  }
});
let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
  {
    name: 'adam boi',
    number: '',
    id: 5,
  },
];

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/info', (req, res) => {
  const numberOfPeople = persons.length;
  const date = new Date();
  res.send(`
  <p>Phone book has info for ${numberOfPeople} people </p>
  <p>${date}</p>  
  `);
});

const getPersonById = (personId) => {
  return persons.find((item) => item.id === personId);
};

app.get('/api/persons/:id', (request, response) => {
  const personId = Number(request.params.id);
  const person = getPersonById(personId);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const personId = Number(request.params.id);
  persons = persons.filter((item) => item.id !== personId);
  response.status(204).end();
});

const generateId = () => Math.floor(Math.random() * 100);

app.post('/api/persons', (request, response) => {
  // console.log(request);
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing',
    });
  }
  const names = [...persons.map((item) => item.name)];
  if (names.includes(body.name)) {
    return response.status(400).json({
      error: 'duplicate name',
    });
  }

  const personId = generateId();
  const person = {
    name: body.name,
    number: body.number,
    id: personId,
  };

  persons = persons.concat(person);
  response.json(person);
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
