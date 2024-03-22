require("dotenv").config();
const PORT = process.env.port || 3001;
const { conn } = require("./src/DB_conection");
const { app } = require("./src/app");

conn.sync({ force: false }).then(() => {
  app.listen(PORT, async () => {
    console.log("Server raised in port: " + PORT);
  });
});
