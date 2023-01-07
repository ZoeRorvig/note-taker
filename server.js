// Require dependencies
const express = require('express');
const apiRouter = require('./routes/apiRouter.js');
const htmlRouter = require('./routes/htmlRouter.js');

// Initialize express app
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(apiRouter);
app.use(htmlRouter);

// Listen for connections
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);