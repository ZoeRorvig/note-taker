// Require dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');
const uuid = require('./helpers/uuid');

// Initialize express app
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for retrieving all the notes
app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  res.json(notes);
});

// POST Route for a new note
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      task_id: uuid(),
    };

    res.json(newNote);
    notes.push(newNote);
    fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(notes), (err) =>
      err ? console.error(err) : console.info(`\nData written to db.json`));
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);