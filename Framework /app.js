const express = require('express');
const routes = require('./routes');
const app = express();

app.use(express.json()); // Middleware pour JSON
app.use('/api', routes); // Routes principales

module.exports = app;
