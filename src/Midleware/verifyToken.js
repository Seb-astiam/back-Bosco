const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log("La menos por aca pase");
  if (!token) {
    console.log("No token");
    return res.status(403).send("Token missing");
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log("Feo token");
      return res.status(403).send("Invalid token");
    }
    next();
  });
};

module.exports = verifyToken;
