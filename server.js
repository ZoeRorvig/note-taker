const express = require('express');
const path = require('path');
const fs = require('fs');
const database = require('./db/db.json');
const uuid = require('./helpers/uuid');

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

// app.get('/', (req, res) => {
//   res.send('Note Taker');
// });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);