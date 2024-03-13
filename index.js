const PORT = 3001;
const { conn } = require("./DB_connection");
const { app } = require("./src/app");

conn.sync({ alter: true }).then(() => {
  app.listen(PORT, async () => {
    await updateDBGenres();
    console.log("Server raised in port: " + PORT);
  });
});
