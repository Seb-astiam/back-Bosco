require("dotenv").config();
const { conn } = require("./src/DB_conection");
const { app } = require("./src/app");
//const { PORT } = process.env;

const port = process.env.PORT || 3001

conn.sync({ alter: true}).then(() => {
  app.listen(port || 3001, () => {
    console.log(`On work port: ${port}`);
  });
});
