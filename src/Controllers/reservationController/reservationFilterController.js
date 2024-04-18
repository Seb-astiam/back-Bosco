const { Reservation, Housing, UserMascota, User } = require("../../DB_conection");
const { Op } = require("sequelize");

const includeAll = () => {
    return [
        {
            model: Housing,
            attributes: ["price", "provinces", "cities", "accommodationType"],
            through: { attributes:[]},
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
            ],
        },
        {
            model: UserMascota,
            attributes: ["name"],
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
            ],
        },
    ];
};



const reservationfilterHandler = async (provinces, cities, price, startDate, endDate, estatus, userEmail) => {
    let where = {};

    if (estatus) where.estatus = estatus;

    let include = includeAll(); 

    if (provinces || cities || price) {
       
        include.push({
            model: Housing,
            attributes: ["price", "provinces", "cities", "accommodationType"],
            through: { attributes:[]},
            where: {} 
        });
    }

    if (provinces) include[include.length - 1].where.provinces = provinces;
    if (cities) include[include.length - 1].where.cities = cities;
    if (price) include[include.length - 1].where.price = price;

    if (startDate && endDate) {
        where.fechaInicio = { [Op.lte]: startDate };
        where.fechaFin = { [Op.gte]: endDate };
    } else if (startDate && !endDate) {
        where.fechaInicio = { [Op.lte]: startDate };
        where.fechaFin = { [Op.gte]: startDate };
    }

 
    if (userEmail) {
        const user = await User.findOne({ where: { email: userEmail } });
        if (user) {
            where[Op.or] = [
                { '$Housings.User.id$': user.id },
                { '$UserMascotum.User.id$': user.id }
            ];
        } else {
            
            where.id = null;
        }
    }

    try {
        const reservaFiltered = await Reservation.findAll({
            attributes: ["id", "estatus", "fechaInicio", "fechaFin"],
            include,
            where,
        });
        return reservaFiltered;
    } catch (error) {
        throw Error(error.message);
    }
};


module.exports = reservationfilterHandler;