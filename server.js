const express = require('express');
const app = express();
require('dotenv').config();
const router = express.Router();
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const db = require('./db/db');
const models = db.models;
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const server = require('http').Server(app);

//////////////////use///////////////////
app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);
app.use(bodyParser.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
var myLogger = function (req, res, next) {
  next();
};
app.use(myLogger);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

//////////////////get////////////////////
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/wrestlers', (req, res, next) => {
  db.models.wrestlers
    .read()
    .then((response) => res.send(response))
    .catch(next);
});

app.post('/api/wrestlers', (req, res, next) => {
  db.models.wrestlers
    .create(req.body)
    .then((response) => res.send(response))
    .catch(next);
});

app.put('/api/wrestlers/:id', (req, res, next) => {
  const id = req.params.id;
  db.models.wrestlers
    .update(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
});

app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
});

app.get('/api/matches', (req, res, next) => {
  db.models.matches
    .read()
    .then((response) => res.send(response))
    .catch(next);
});

app.post('/api/matches', (req, res, next) => {
  db.models.matches
    .create(req.body)
    .then((response) => res.send(response))
    .catch(next);
});

app.put('/api/matches/:id', (req, res, next) => {
  const id = req.params.id;
  db.models.matches
    .update(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
});

app.get('/api/factions', (req, res, next) => {
  db.models.factions
    .read()
    .then((response) => res.send(response))
    .catch(next);
});

app.post('/api/factions', (req, res, next) => {
  db.models.factions
    .create(req.body)
    .then((response) => res.send(response))
    .catch(next);
});

app.put('/api/factions/:id', (req, res, next) => {
  const id = req.params.id;
  db.models.factions
    .update(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
});

app.use((req, res, next) => {
  const error = {
    message: `page not found ${req.url} for ${req.method}`,
    status: 404,
  };
  next(error);
});

app.use((err, req, res, next) => {
  console.log('error:', err.status);
  res.status(err.status || 500).send({ message: err.message });
});

const port = process.env.PORT || 3000;
db.sync()
  .then(() => {
    console.log('db synced');
    server.listen(port, () => console.log(`listening on port ${port}`));
  })
  .catch((ex) => console.log(ex));
