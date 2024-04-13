require("dotenv").config();
const { conn, User } = require("./src/DB_conection");
const usuario = require("./src/Models/usuario");
const { app } = require("./src/app");
const http = require("http");
const { Server } = require("socket.io");
const transporter = require("./src/Utils/createTransport");

const port = process.env.PORT || 3001;

const server = http.createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (usuario) => {
    const room = usuario;
    socket.join(room);
  });

  socket.on("notificacion", (mensaje, usuario) => {
    const noti = mensaje;
    const room = usuario.UserEmail;

    let mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: usuario.UserEmail,
      subject: "Solicitud Aprobada",
      html: `<p>Su solicitud de reserva ha sido aceptada</p>`,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        throw Error(err.message);
      }
    });

    socket.to(room).emit("notificacion", noti);
  });
});

conn.sync({ force: false }).then(() => {
  server.listen(port, () => {
    console.log(
      `Servidor Express y Socket.IO en funcionamiento en el puerto ${port}`
    );
  });
});
