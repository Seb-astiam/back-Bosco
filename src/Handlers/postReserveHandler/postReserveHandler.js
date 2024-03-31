
const {User, Housing, Reservation } = require("../../DB_conection")
const {Sequelize} = require("sequelize");
const Op = Sequelize.Op;

const getReserve = async (req, res) => {
        try {
            const {id} = req.params;

            const responseDB = await Reservation.findAll(
                {
                    include:  [
                        {
                          model: User,
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
}


const postReserveHandler = async (req, res) => {

    const { senderId, recipientId, fecha, estatus } = req.body;
    console.log(req.body);
    try {
      const reservation = await Reservation.create({fecha, estatus});
      console.log(reservation);

      await Reservation.addUser(senderId);
      await Reservation.addHousing(recipientId);

      //io.emit('reservation_create', notification);

      res.status(201).json({ message: "Reserva creada exitosamente"});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
   
    };
module.exports= {
  postReserveHandler,
  getReserve
};