const { User, Profile, Housing ,Service,UserMascota} = require("../../DB_conection");

const userProfileHandler = async (id) => {
    try {
        const user = await User.findOne({
            where: {
                id: id,
            },
            include: [ {
                model: Profile,
            },
            {
                model: Housing , include: [
                    {
                        model: Service,
                        attributes: ["id", "type"], 
                        through: { attributes: [] },
                    },
                ],
            },
            {
                model: UserMascota
            },



        ]
        });

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        return user;
    } catch (error) {
        throw new Error(`Error al obtener el usuario y su perfil: ${error.message}`);
    }
};

module.exports = userProfileHandler;
