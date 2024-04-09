require("dotenv").config();
const { conn, User } = require("./src/DB_conection");
const { app } = require("./src/app");
const http = require('http');
const { Server } = require('socket.io')

const port = process.env.PORT || 3001

const server = http.createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET","POST"]
} 
})



io.on("connection", (socket) => {
  console.log(`Usuario conectado ${socket.id}`);

  socket.on("notificacion", (mensaje, usuario) => {
    const noti = mensaje
    socket.broadcast.emit("notificacion", noti);
  });
});

conn.sync({ alter: true }).then(() => {
  server.listen(port, () => {
    console.log(`Servidor Express y Socket.IO en funcionamiento en el puerto ${port}`);
  });
});









