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
    return [newUser, created];
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { googleRegisterController };
// const { User } = require("../../DB_conection");
// const axios = require("axios");

// const googleRegisterController = async (token) => {
//   try {
//     const { data } = await axios(
//       `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
//     );
//     // console.log(data);
//     const { name, picture, email } = data;
//     const defaults = {
//       name,
//       picture,
//       password: "thisisagoogleaccount",
//       googleAccount: true,
//     };

//     const [newUser, created] = await User.findOrCreate({
//       where: { email },
//       defaults,
//     });
//     if (created) await newUser.addRoles(1);
//     return [newUser, created];
//   } catch (error) {
//     throw Error(error.message);
//   }
// };

// module.exports = { googleRegisterController };
