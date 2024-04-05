const { User } = require("../../DB_conection");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const activateAccountController = async (token) => {
  try {
    const { email } = jwt.verify(token, process.env.PRIVATE_KEY);
    const user = await User.findOne({
      where: { email },
    });

    if (!user) return false;
    if (user.status === true) throw Error("Activado");
    await user.update(
      { status: true },
      {
        fields: ["status"],
      }
    );
    return true;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = activateAccountController;
