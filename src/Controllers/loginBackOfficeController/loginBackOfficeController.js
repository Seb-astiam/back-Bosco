// const axios = require("axios");
// const URL = "https://apis.datos.gob.ar/georef/api/";

const { User, Role } = require("../../DB_conection");
const bcrypt = require("bcrypt");



const loginBackOfficeController = async (email, password) => {

  try {
    const user = await User.findOne({ where: { email },  
      include: { 
        model: Role, 
        attributes: ['name'], 
        through: { 
          attributes: [] 
        }
      } 
    }) 
    
    if(!user) return false

    const rol = user.Roles[0]

    const isPasswordValid = await bcrypt.compare(password, user.password);

   if(rol.name === 'administrador' && isPasswordValid) {
    return true
   } 

   return false

  } catch (error) {
    throw Error(error.message);
  }
};



module.exports = { loginBackOfficeController };
