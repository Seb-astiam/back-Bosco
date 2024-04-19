const { Profile, User } = require("../../DB_conection");

const createNewProfile = async (user) => {
  const {name ,surname ,genre, userId, province, city, address, phone, balance } = user;

  const profile = {
    name ,
    surname ,
    genre,
    province,
    city,
    address,
    phone,
  };
  if (balance) profile.balance = balance;

  try {
    const user = await User.findByPk(userId);
    if (!user) throw Error("Id invalido");
    await user.createProfile(profile);
    return;
  } catch (error) {
    throw Error(error.message);
  }
};

const getProfileByemail = async (email) => {
  try {
    const user = await User.findOne({
      where:{
        email
      }
    });
    if (!user) throw Error("email invalido");
    const profile = await user.getProfile();
    return profile;
  } catch (error) {
    throw Error(error.message);
  }
};

const deleteProfile = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) throw Error("Id invalido");
    await user.setProfile(null);
    return;
  } catch (error) {
    throw Error(error.message);
  }
};

const updateProfile = async (profile) => {
  const {
    userEmail,
    province,
    city,
    address,
    phone,
    balance,
    housingProfile,
    petProfile,
    name,
    surname,
    genre
  } = profile;

  try {
    const user = await User.findOne({
      where:{
        email:userEmail
      }
    });
    const newProfile = await user.getProfile();

    let attributes = {};

    if (province) attributes = { ...attributes, province };
    if (city) attributes = { ...attributes, city };
    if (address) attributes = { ...attributes, address };
    if (phone) attributes = { ...attributes, phone };
    if (balance) attributes = { ...attributes, balance };
    if (housingProfile) attributes = { ...attributes, housingProfile };
    if (petProfile) attributes = { ...attributes, petProfile };
    if (name) attributes = { ...attributes, name };
    if (surname) attributes = { ...attributes, surname };
    if (genre) attributes = { ...attributes, genre };

    await newProfile.update(attributes, {
      fields: Object.keys(attributes),
    });

    return true;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  createNewProfile,
  getProfileByemail,
  deleteProfile,
  updateProfile,
};
