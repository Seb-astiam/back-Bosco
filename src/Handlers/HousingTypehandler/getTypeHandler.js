const { HousingType} = require("../../DB_conection");

const getTypehandler = async () => {

    try {
        const type = await HousingType.findAll({
            attributes: ['id', 'type'],
            order: [['type', 'ASC']]
        });
        return type;
    } catch (error) {
        console.log(error);
        throw Error(error.message);
    }
};
module.exports=getTypehandler 