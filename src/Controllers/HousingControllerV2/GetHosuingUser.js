const getHousingsUser = require("../../Handlers/HousinhandlerV2/GetHosuingUserHandler");

const getHosuingUser = async (req, res) => {
  const { email } = req.params;
  try {
    const housingsUser = await getHousingsUser(email);
    res.status(200).json(housingsUser);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = getHosuingUser;
