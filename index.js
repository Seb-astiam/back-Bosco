require("dotenv").config();
const { conn } = require("./src/DB_conection");
const { app } = require("./src/app");
const initializeSocket = require('./src/socket')
const http = require('http');
// const { PORT } = process.env;

const port = process.env.PORT || 3001
const server = http.createServer(app);
initializeSocket(server);
conn.sync({ alter: true }).then(() => {
  server.listen(port, () => {
    console.log(`Servidor Express y Socket.IO en funcionamiento en el puerto ${port}`);
  });
});









