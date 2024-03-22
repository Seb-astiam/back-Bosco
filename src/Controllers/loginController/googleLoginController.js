const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();
const { GOOGLE_CLIENT_ID } = process.env;

const googleLoginController = async (token) => {
  const client = new OAuth2Client(GOOGLE_CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email } = ticket.getPayload();

    //Buscar en la DB Si no esta error usuario no registrado
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { googleLoginController };
