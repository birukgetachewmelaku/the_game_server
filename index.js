const express = require('express');
const udp = require('./udp.js');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Define a route for the "/about" URL
app.get('/about', (req, res) => {
  res.send('About page');
});

// Define a route for handling POST requests
app.post('/data', (req, res) => {
  const { name, age } = req.body;
  res.send(`Received data: ${name}, ${age}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});