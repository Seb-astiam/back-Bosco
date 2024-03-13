const {
  createNewuser,
} = require("../../Controllers/userController/userController");

const postUser = async (req, res) => {
  const { name, email, password, province, city, address, phone, balance } =
    req.body;
  try {
    if (
      !name ||
      !email ||
      !password ||
      !province ||
      !city ||
      !address ||
      !phone
    )
      return res.status(400).send("Falta información de registro");
    const newUser = { name, email, password, province, city, address, phone };
    if (balance) newUser.balance = balance;

    const created = await createNewuser(newUser);

    if (created) {
      return res.status(201).send("Usuario creado exitosamente");
    } else {
      return res.status(400).send("Ya existe un usuario con el mail ingresado");
    }
  } catch (error) {
    console.log("Error creando usuario: " + error.message);
  }
};

module.exports = { postUser };
