// Require dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const tasks = require('./db/db.json');
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



// GET Route for retrieving all the tasks
app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for tasks`);
  res.json(tasks);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);