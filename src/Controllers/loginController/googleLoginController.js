const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();
const { GOOGLE_CLIENT_ID } = process.env;
const { User } = require("../../DB_conection");

const googleLoginController = async (token) => {
  try {
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const { email } = ticket.getPayload();

    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { googleLoginController };
