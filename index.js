require("dotenv").config();
const { conn } = require("./src/DB_conection");
const { app } = require("./src/app");
const port = process.env.PORT || 3001

conn.sync({ force: false }).then(() => {
  app.listen(port|| 3000, () => {
    console.log(`On work port: ${port}`)
})
});
