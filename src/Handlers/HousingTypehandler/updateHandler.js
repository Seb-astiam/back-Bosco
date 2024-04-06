const { HousingType} = require("../../DB_conection");

const updateTypeHandler= async (id,newType) => {

    try {
        const type= await HousingType.findByPk(id);
        if (!type) {
            throw new Error('El servicio no fue encontrado');
        }
        await type.update(newType);

    } catch (error) {
        throw Error(error.message);
    }
};
module.exports=updateTypeHandler


