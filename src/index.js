require("dotenv").config();
const PORT = process.env.port || 3001;
const { conn } = require("./src/DB_conection");
const { app } = require("./src/app");

conn.sync({ force: false }).then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log("On work")
})
});
