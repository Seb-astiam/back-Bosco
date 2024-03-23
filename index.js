require("dotenv").config();
const { conn } = require("./src/DB_conection");
const { app } = require("./src/app");

const  port= process.env.PORT || 3001
conn.sync({ alter: false }).then(() => {
  app.listen(port, () => {
    console.log("On work")
})
});
