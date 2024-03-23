const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();
const { GOOGLE_CLIENT_ID } = process.env;
const { User } = require("../../DB_conection");

const googleRegisterController = async (token) => {
  try {
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();

    const defaults = {
      name,
      picture,
      password: "thisisagoogleaccount",
      googleAccount: true,
    };

    const [newUser, created] = await User.findOrCreate({
      where: { email },
      defaults,
    });
    if (created) await newUser.addRoles(1);
    return created;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { googleRegisterController };
