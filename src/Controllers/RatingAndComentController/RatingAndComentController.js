const { UserMascota, User, Housing, RatingPet, RatingHousing } = require("../../DB_conection");

const postReviewController = async ({ id_alojamiento, email_usuario, fecha, rating, comentario, UserMascotumId }) => {


    try {
 
        const idUser = await User.findOne({
            where: {
                email: email_usuario
            },
            attributes: ['id']
        });

        const  createCalificationHousing= await RatingHousing.create({ fecha, comentario, rating, UserMascotumId });

        await createCalificationHousing.addUsers(idUser.dataValues.id);
        await createCalificationHousing.addHousings(id_alojamiento);

       return createCalificationHousing;

    } catch (error) {
        throw Error(error.message);
    }
};

const getAllReviewsController = async (email) => {
    try {

const allReviews = await RatingHousing.findAll({
    include: [
        {
            model: User,
            where: {
                email: email
            }
        },
        {
            model: Housing,
            attributes: ['title', 'price', 'provinces', 'UserId'],
            through: {
                attributes: [],
            },
        }
    ]
});

        if (!allReviews.length) {
            return "No hay reservas registradas para este usuario";
        }

        return allReviews;

    } catch (error) {
        throw Error(error.message);
    }
};

const getReviewsAlojamientoController = async (identificacion) => {
    try {
        const userHousing = await Housing.findAll({
           where: {
            UserId: identificacion
           }
        });

        if (!userHousing) return false;


        const vistaAlojamiento = Promise.all(userHousing.map(async (housing) => {
            return await RatingHousing.findAll({
                include: [{
                    model: Housing,
                    where: {
                       id: housing.id 
                    }
                },
                {
                    model: User,
                    attributes: ['email', 'name', 'id']
                }
                ]
            })
        })) 


        return vistaAlojamiento


    } catch (error) {
        throw Error(error.message);
    }
}






module.exports = { postReviewController, getAllReviewsController, getReviewsAlojamientoController };
