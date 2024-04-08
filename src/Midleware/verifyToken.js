//Middleware para proteger rutas
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send("Token missing");
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }
    next();
  });
};

module.exports = verifyToken;
