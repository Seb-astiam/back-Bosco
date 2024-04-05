const { HousingType} = require("../../DB_conection");

const delTypeHandler= async (id) => {

    try {
        const type = await HousingType.findByPk(id);
        if (!type) {
            throw new Error('El servicio no fue encontrado');
        }
        await type.destroy();

    } catch (error) {
        throw Error(error.message);
    }
};
module.exports=delTypeHandler