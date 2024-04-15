const { User, Role } = require("../../DB_conection");
const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const userAdminHandlers = async (name, email, password, selectedRoleId) => {
  try {
    const hashedPassword = await hashPassword(password);

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name,
        password: hashedPassword,
        status:true,
      },
    });

    if (!created) {
      return { success: false, message: "El usuario ya existe" };
    }

    const role = await Role.findByPk(selectedRoleId);

    if (!role) {
      throw new Error("Rol no encontrado");
    }

    await user.addRoles([role]);

    return { success: true, message: "Usuario creado exitosamente" };
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return {
      success: false,
      message: "Error al crear usuario: " + error.message,
    };
  }
};

module.exports = userAdminHandlers;
