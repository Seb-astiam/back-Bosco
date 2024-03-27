const { Reserve } = require("../../DB_conection");

const createReserve = async (reserve) => {
    const { UserMascotaId, housingId, startDate, endDate } =
        reserve;
    const existingReserve = await Reserve.findOne({
        where: {
            UserMascotaId:UserMascotaId,
        },
    });

    // Si existe, lanzar un error
    if (existingReserve) {
        throw new Error('Ya existe una reserva para esta mascota');
    }
    try {
        const [newReserve, created] = await Reserve.findOrCreate({
            where: {
                UserMascotaId, HousingId, startDate, endDate
            }
        });
        return created;
    } catch (error) {
        console.log(error);
        throw Error(error.message);
    }
};

const getReserve = async () => {

    try {
        const reserves = await Reserve.findAll();
        return reserves;
    } catch (error) {
        console.log(error);
        throw Error(error.message);
    }
};


module.exports = { createReserve, getReserve };
