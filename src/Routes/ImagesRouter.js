const express = require("express");

const imagesRouter = express.Router();


imagesRouter.get('/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, `../Uploads/${imageName}`);

  res.sendFile(imagePath);
});