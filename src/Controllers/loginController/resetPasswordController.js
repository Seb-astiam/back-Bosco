const { User } = require("../../DB_conection");
const generator = require("generate-password");
require("dotenv").config();
const transporter = require("../../Utils/createTransport");
const createMailBody = require("../../Utils/createMailBody");
const bcrypt = require("bcrypt");

const resetPasswordController = async (email) => {
  const password = generator.generate({
    length: 15,
    numbers: true,
    symbols: true,
    strict: true,
  });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findOne({ where: { email } });
    if (!updatedUser) return false;
    await updatedUser.update(
      { password: hashedPassword },
      {
        where: { email },
        fields: ["password"],
      }
    );

    const body = createMailBody(password, updatedUser.name);

    let mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: "Reseteo de Password",
      html: body,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        throw Error(err.message);
      }
    });

    return true;
  } catch (error) {
    throw Error(error.message);
  }
};
module.exports = resetPasswordController;
