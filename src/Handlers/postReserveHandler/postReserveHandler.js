
const {UserMascota, Housing, Reservation } = require("../../DB_conection")
const {Sequelize} = require("sequelize");
const Op = Sequelize.Op;

const getReserve = async (req, res) => {
        try {
            const {id} = req.params;

            const responseDB = await Reservation.findAll(
                {
                    include:  [
                        {
                          model: UserMascota,
                          where: { id },
                          
                          through: { attributes: [] }, // No incluye los atributos de la tabla intermedia
                        },
                      ]
                    },
                  
            )
            return res.status(200).json(responseDB)
        } catch (error) {
            console.log(error)
        }
};



const postReserveHandler = async (req, res) => {
  const { senderId, recipientId, fecha, estatus } = req.body;
  console.log(req.body);
  
  try {
      // Crear una nueva reserva con la fecha y el estatus proporcionados
      const reservation = await Reservation.create({ fecha, estatus });
      console.log(reservation);
      
      // Asociar el modelo UserMascota con la reserva
      const userMascota = await UserMascota.findByPk(senderId);
      if (!userMascota) {
          throw new Error('UserMascota no encontrado');
      }
      await reservation.addUserMascota(userMascota);
      
      // Asociar el modelo Housing con la reserva
      const housing = await Housing.findByPk(recipientId);
      if (!housing) {
          throw new Error('Housing no encontrado');
      }
      await reservation.addHousing(housing);  
      

      res.status(201).json({message: "Reserva creada exitosamente",
      reservation: {
        id: reservation.id,
        fecha: reservation.fecha,
        estatus: reservation.estatus,
        senderId: userMascota.id, 
        recipientId: housing.id 
      } });
  } catch (error) {      
      res.status(400).json({ message: error.message });
  }
};

module.exports = {
  postReserveHandler,
  getReserve
};