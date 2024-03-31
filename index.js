require("dotenv").config();
const { conn } = require("./src/DB_conection");
const { app } = require("./src/app");
// const { PORT } = process.env;
const port = process.env.PORT || 3001

conn.sync({ force: false }).then(() => {
    app.listen(port, () => {
    console.log(`On work port: ${port}`)
})
});
