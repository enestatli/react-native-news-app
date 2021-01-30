const express = require('express');
var bodyParser = require('body-parser');

require('dotenv').config();

const { config } = require('./config');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/test', (req, res) => {
  res.json(req.body);
});
console.log(config);

app.listen(3000, () => console.log('Express is on 3000'));
