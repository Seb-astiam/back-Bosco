const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors')
const routeMascota = require('./Routes/MascotaRoute');
const app = express();
// const accesList = ['http://localhost:5173', 'http://localhost:5174' ] app.use(cors({ origin: accesList })); uso de cors limitado

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

app.use('/', routeMascota);
module.exports = {
    app,
  };