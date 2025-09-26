const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');


const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT ||'3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);
// Configuration CORS si front séparé
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4202', // ton frontend Angular
    methods: ['GET', 'POST', 'PUT']
  }
});
app.set('io', io);

// Quand un client se connecte
// Quand un client se connecte
io.on('connection', (socket) => {
  //console.log('Nouvel utilisateur connecté:', socket.id);

  // Notification "globale" (envoyée à tous)
  socket.on('sendNotification', (data) => {
    //console.log('Notification reçue:', data);
    io.emit('receiveNotification', data); // Envoie à tous les clients connectés
  });

  // Déconnexion
  socket.on('disconnect', () => {
   // console.log('Utilisateur déconnecté:', socket.id);
  });
});

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  //console.log('Listening on ' + bind);
});

server.listen(port);