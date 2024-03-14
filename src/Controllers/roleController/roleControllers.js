const { Service, Role } = require("../../DB_conection");

const createRole = async (service) => {
    const { name } =
        service;

    try {
        const [newService, created] = await Role.findOrCreate({
            where: {
                name
            }
        });
        return created;
    } catch (error) {
        console.log(error);
        throw Error(error.message);
    }
};

const getRoles = async () => {

    try {
        const role = await Role.findAll({
            attributes: ['id', 'name'],
            order: [['name', 'ASC']]
        });
        return role;
    } catch (error) {
        throw Error(error.message);
    }
};
const updateRole = async (id,newRole) => {

    try {
        const rol = await Role.findByPk(id);
        if (!rol) {
            throw new Error('Rol no fue encontrado');
        }
        await rol.update(newRole);
    } catch (error) {
        throw Error(error.message);
    }
};
const deleteRole = async (id) => {

    try {
        const rol = await Role.findByPk(id);
        if (!rol) {
            throw new Error('El rol no fue encontrado');
        }
        await rol.destroy();

    } catch (error) {
        throw Error(error.message);
    }
};

module.exports = {
    createRole,
    getRoles,
    updateRole,
    deleteRole
};
