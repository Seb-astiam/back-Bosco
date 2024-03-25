const { Server } = require('socket.io');

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    // Aca recibo los eventos que emite el front
    socket.on('mensaje', (mensaje) => {
      console.log('Mensaje recibido:', mensaje);
      // Puedes emitir mensajes a otros clientes, guardar en la base de datos, etc.
      // hay que emitir el evento con io.to.emit por que son notifiacicon individual ya vere como lo hago 
      // io.emit('notificacion', 'Nuevo mensaje recibido: ' + mensaje);
    });
  

     socket.to(userid).emmit('notificacion', mensaje )

     
    socket.on('disconnect', () => {
      console.log('Un cliente se ha desconectado');
    });
  });

  return io;
};

module.exports = initializeSocket;
