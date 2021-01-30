const express = require('express');
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/test', (req, res) => {
  res.json(req.body);
});

app.listen(3000, () => console.log('Express is on 3000'));
