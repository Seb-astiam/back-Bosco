const { Service } = require("../../DB_conection");

const createService = async (service) => {
    const { type } =
        service;
    const defaults = {
        type
    };

    try {
        const [newService, created] = await Service.findOrCreate({
            where:{
                type 
            }
        });
        return created;
    } catch (error) {
        throw Error(error.message);
    }
};

const getServices = async () => {

    try {
        const services = await Service.findAll({
            attributes: ['id', 'type'],
            order: [['type', 'ASC']]
        });
        return services;
    } catch (error) {
        throw Error(error.message);
    }
};
const updateService = async (id,newRole) => {

    try {
        const service = await Service.findByPk(id);
        if (!service) {
            throw new Error('Servicio no fue encontrado');
        }
        await service.update(newRole);
    } catch (error) {
        throw Error(error.message);
    }
};
const deleteService = async (id) => {

    try {
        const service = await Service.findByPk(id);
        if (!service) {
            throw new Error('El servicio no fue encontrado');
        }
        await service.destroy();

    } catch (error) {
        throw Error(error.message);
    }
};

module.exports = { createService,getServices,updateService,deleteService };
