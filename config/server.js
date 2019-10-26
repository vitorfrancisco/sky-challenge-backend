const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const Router = require('../app/routes/routes');

app.use(morgan('combined', { "stream": winston.stream.write}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(Router);

module.exports = app;