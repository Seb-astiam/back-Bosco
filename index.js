require("dotenv").config();
const { conn } = require("./src/DB_conection");
const { app } = require("./src/app");
const { PORT } = process.env;

conn.sync({ force: false }).then(() => {
  app.listen(PORT || 3001, () => {
    console.log(`On work port: ${PORT}`);
  });
});
