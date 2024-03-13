const {createUserMascotaController} = require ('../../Controllers/userMascotaControllers/userMascotaControllers')

const createUserMascotaHandler = async (req, res) => {
  const { image, name, type, age, raze, aggressiveness, genre, coexistence, size } = req.body;
    try {
      if (image, name, type, age, raze, aggressiveness, genre, coexistence, size) {
        const responseController = await createUserMascotaController({
          image, name, type, age, raze, aggressiveness, genre, coexistence, size
        })
        res.status(201).json(responseController);
      }
      else { res.status(400).send("no estan todas las propiedades")}
    } catch (error) {
      res.status(417).send("Error creating product");
    }
  };


  module.exports ={createUserMascotaHandler,}