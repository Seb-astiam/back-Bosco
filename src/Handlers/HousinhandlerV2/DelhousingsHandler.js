const { Housing, Service } = require("../../DB_conection");

const DelHousingsHandlers = async (id) => {
    try {
        // Buscar el housing por su ID
        const housing = await Housing.findByPk(id);

        // Verificar si el housing existe
        if (!housing) {
            throw new Error('El housing no fue encontrado');
        }

        // Obtener los servicios asociados al housing
        const services = await housing.getServices();

        // Eliminar los servicios asociados
        await housing.removeServices(services);

        // Eliminar el housing
        await housing.destroy();

        // Devolver un mensaje de éxito u otro tipo de respuesta si es necesario
        return 'El housing y sus servicios asociados fueron eliminados correctamente';
    } catch (error) {
        throw Error(error.message);
    }
}

module.exports = DelHousingsHandlers;
