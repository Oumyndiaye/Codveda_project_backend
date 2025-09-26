const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const http = require('http');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

mongoose.connect(
  'mongodb://root:root@localhost:27017/Test?authSource=admin',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Connexion MongoDB locale réussie !'))
.catch(err => console.log('Erreur de connexion :', err));


const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app