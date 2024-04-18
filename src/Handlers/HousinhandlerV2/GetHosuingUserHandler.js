const { Housing, Service, User, HousingType } = require('../../DB_conection');


const getHousingsUser = async (email) => {
  try {
    const user = await User.findOne({
      where: {
        email
      }
    });
    console.log(user, "-------------user--------------");
    if (!user) throw Error("email invalido");

    const housing = await Housing.findAll({
      where: {
        UserId: user.id
      },
      include: [
        {
          model: Service
        },
        {
          model: HousingType
        }
      ]
    });


    // Construir las URL completas para las imágenes y agregarlas a la respuesta


    return housing;
  } catch (error) {
    throw new Error("Error al obtener alojamientos :", error);
  }
};

module.exports = getHousingsUser;
