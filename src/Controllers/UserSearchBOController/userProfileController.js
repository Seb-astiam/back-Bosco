const userProfileHandler = require('../../Handlers/UserSearchBOhandler/userProfilehandler');

const userProfileController = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'El ID no está presente en los parámetros de la solicitud.' });
    }

    try {
        const response = await userProfileHandler(id);
        if (response) {
            return res.status(200).json(response);
        } else {
            return res.status(404).json({ message: `No se encontraron datos en el perfil para el ID: ${id}` });
        }
    } catch (error) {
        return res.status(500).json({ error: `Error al obtener el perfil del usuario: ${error.message}` });
    }
};

module.exports = userProfileController;
