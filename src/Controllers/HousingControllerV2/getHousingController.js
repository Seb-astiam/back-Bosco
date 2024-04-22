const { getHousingIDHandler } = require('../../Handlers/HousinhandlerV2/getHousingIDHandler')

const getHousingController = async (req, res) => {
    const { idHousing } = req.params;

    try {
        const Housing = await getHousingIDHandler(idHousing);

        if(Housing) {
            res.status(200).json(Housing)
        } else {
            res.status(404).send('No se encontro Alojamiento');
        }
    } catch (error) {
        res.status(500).json({error: error.messages})
    }
}

module.exports = {
    getHousingController
}