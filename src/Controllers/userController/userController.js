const { User, Role } = require("../../DB_conection");
const bcrypt = require("bcrypt");
//esto
const jwt = require("jsonwebtoken");
require("dotenv").config();
const createActivationBody = require("../../Utils/createActivationBody");
const transporter = require("../../Utils/createTransport");


const createNewuser = async (user, roleIds) => {
  const { name, email, password, picture } = user;

  const hashedPassword = await bcrypt.hash(password, 10);
  const defaults = {
    name,
    picture,
    password: hashedPassword,
    //esto
    status: false,
  };

  try {
    const [newUser, created] = await User.findOrCreate({
      where: { email },
      defaults,
    });

    if (created) {
      if(roleIds){
        const roles = await Role.findAll({ where: { id: roleIds } });
        await newUser.addRoles(roles);
      } else {
        const [roles, creado] = await Role.findOrCreate({ where: { name: ("usuario") } });
        await newUser.addRoles(roles);
      }
      //esto
      const token = jwt.sign({ email }, process.env.PRIVATE_KEY);
      const body = createActivationBody(token, name);
      let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: email,
        subject: "Activa tu cuenta",
        html: body,
      };
      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          throw Error(err.message);
        }
      });
    }

    return [user, created];
  } catch (error) {
    console.log(error);
    throw Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll({
      attributes: ["id","name", "email", "picture", "status"],
      include: {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    });
    return users;
  } catch (error) {
    throw Error(error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: { email },
      attributes: ["name", "email", "picture"],
      include: {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    });
    return user;
  } catch (error) {
    throw Error(error.message);
  }
};

const getUserByIdController= async (id) => {
  try {
    const user = await User.findOne({
      where: {
        id
      },
      attributes: ['name', 'email']
    });

    return user;
  } catch (error) {
    throw Error(error.message);
  }
};



const deleteUser = async (email) => {
  try {
    const deleted = await User.destroy({ where: { email } });
    return deleted;
  } catch (error) {
    throw Error(error.message);
  }
};

const updateUser = async (user) => {
  const { name, email, password, picture } = user;
  try {
    const updatedUser = await User.findOne({ where: { email } });
    if (!updatedUser) return false;

    let attributes = {};
    if (name) attributes = { ...attributes, name };
    if (picture) attributes = { ...attributes, picture };
    if (password) attributes = { ...attributes, password };

    await updatedUser.update(attributes, {
      where: { email },
      fields: Object.keys(attributes),
    });

    return true;
  } catch (error) {
    throw Error(error.message);
  }
};

const blockAccountController = async (block, email) => {
  try {
    const blockUser = await User.findOne({ where: { email } });

    if (!blockUser) {
      return "No se encontró un usuario con ese email.";
    }

  
    await blockUser.update({ status: block });

   
    if (block) {
      return "Usuario desbloqueado con éxito.";
    } else {
     
      return "Usuario bloqueado con éxito.";
    }
  } catch (error) {
    console.error("Error al bloquear usuario:", error);
    throw new Error("Error al bloquear usuario.");
  }
};
const updatePictureController = async (userData, email) => {
  try {
    // Buscar al usuario por su correo electrónico
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Actualizar la foto del usuario
    user.picture = userData.picture[0]; // Suponiendo que 'picture' es el campo de la foto en tu modelo de usuario

    // Guardar los cambios en la base de datos
    await user.save();

    return user;
  } catch (error) {
    throw new Error(`Error al actualizar la foto del usuario: ${error.message}`);
  }
};



module.exports = {
  createNewuser,
  getAllUsers,
  getUserByEmail,
  deleteUser,
  updateUser,
  blockAccountController,
  getUserByIdController,
  updatePictureController
};
