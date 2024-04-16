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
    console.log(error);
    throw Error(error.message);
  }
};

const getProfileByemail = async (email) => {
  try {
    const user = await User.findOne({
      where:{
        email:email
      }
    });
    if (!user) throw Error("Id invalido");
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
    userId,
    province,
    city,
    address,
    phone,
    balance,
    housingProfile,
    petProfile,
  } = profile;

  try {
    const newProfile = await Profile.findOne({ where: { UserId: userId } });

    let attributes = {};

    if (province) attributes = { ...attributes, province };
    if (city) attributes = { ...attributes, city };
    if (address) attributes = { ...attributes, address };
    if (phone) attributes = { ...attributes, phone };
    if (balance) attributes = { ...attributes, balance };
    if (housingProfile) attributes = { ...attributes, housingProfile };
    if (petProfile) attributes = { ...attributes, petProfile };

    await newProfile.update(attributes, {
      where: { UserId: userId },
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
