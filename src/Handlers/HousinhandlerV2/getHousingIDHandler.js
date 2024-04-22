const { Housing, Service, User } = require("../../DB_conection");

const getHousingIDHandler = async (idHousing) => {
    try {
        const hosuing = await Housing.findOne({
            where: {
                id: idHousing
            }, 
            include: [
                {
                model: Service,
                attributes: ["id", "type"],
                through: { attributes: [] },
                },
                {
                  model: User,
                  attributes: ["name", "email"]
                }
              ]
        });

        return hosuing
    } catch (error) {
        return Error(error)
    }
}

module.exports = {
    getHousingIDHandler
}