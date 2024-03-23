<<<<<<< HEAD
const { User } = require("../../DB_conection");
const axios = require("axios");

const googleLoginController = async (token) => {
  try {
    const { data } = await axios(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
    );
    const { email } = data;
    const user = await User.findOne({
      where: { email },
      include: {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    });
=======
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

    const user = await User.findOne({
      where: { email },
      include: {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    });
    return user;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { googleLoginController };
