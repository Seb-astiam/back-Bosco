require("dotenv").config();
const { conn } = require("./DB_conection");
const { app } = require("./app");

conn.sync({ force: false }).then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log("On work")
})
});
