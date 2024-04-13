
const { HousingType} = require("../../DB_conection");

const addTypeHandler  = async(type)=>{
    try {
        const [, created] = await HousingType.findOrCreate({
            where: {
                type // Suponiendo que 'type' es el nombre del tipo de alojamiento que deseas crear
            }
        });
        return created
        ? "El tipo de alojamiento ha sido creado exitosamente."
        : "El tipo de alojamiento ya existe.";
    } catch (error) {
        // Manejar el error
        throw new Error(`Error al crear el tipo de alojamiento: ${error.message}`);
    }
}

module.exports=addTypeHandler