'use strict';

const express = require('express');
const app = express();

function requestLogger(req, res, next) {
  const now = new Date();
  console.log(
    `${now.toLocaleDateString()} ${now.toLocaleTimeString()} ${req.method} ${req.url}`);
  next();
}

app.use(requestLogger);

app.get('/url-1', (req, res) => res.send('request made to /url-1'));
app.get('/url-2', (req, res) => res.send('request made to /url-2'));


app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));

