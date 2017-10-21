const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const email = require('./controllers/email');

const app = express();
const PORT_NUMBER = 8081;

const CORS_CONFIG = {
  origin: 'http://localhost:3000'
};

// Middleware
app.use(bodyParser.json());

// Route
app.use('/email', cors(CORS_CONFIG), email);

const server = app.listen(PORT_NUMBER, () => {
  const { port } = server.address();

  console.log(`Take Home API listening to port ${port}`);
});

module.exports = server;
