const express = require('express');

const app = express();

app.get('/user', (request, response, next) => {
  response.send('User route is on');
});

app.get('/admin', (request, response, next) => {
  if (request && request.query && request.query.msg) {
    response.send(request.query.msg);
    return;
  }
  response.send('Msg yok');
});

app.listen(3000, () => console.log('Express is on 3000'));
