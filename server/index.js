const express = require('express');

const app = express();

app.get('/user/:id/hair/:category', (req, res) => {
  console.log(req.params.category);
  console.log(req.query.age);
});

app.listen(3000, () => console.log('Express is on 3000'));
