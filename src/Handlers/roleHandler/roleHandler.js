const { getRoles, createRole, deleteRole, updateRole } = require("../../Controllers/roleController/roleControllers");


const postRoleHandler = async (req, res) => {
    const { name } =
      req.body;
    try {
      if (
        !name
      )
        return res.status(400).send("Falta información de registro");
      const newRole = { name };
  
      const created = await createRole(newRole);
  
      if (created) {
        return res.status(201).send("Rol creado exitosamente");
      } else {
        return res.status(400).send("Ya existe este rol");
      }
    } catch (error) {
      res.status(500).send("Error creando rol: " + error.message);
    }
  };

const getAllRolesHandler = async (req, res) => {

    try {

      const roles = await getRoles();
  
      if (roles.length<1) {
          return res.status(400).send("No se encontro ningún rol");
        } else {
          return res.json(roles);
      }
    } catch (error) {
      res.status(500).send("Error buscando roles: " + error.message);
    }
  };
  
const deleteRoleHandler = async (req, res) => {
  const{ id } = req.params
    try {

      const rolElimado = await deleteRole(id);
  
      res.status(200).json({
        message: "Rol eliminado correctamente",
      });
    } catch (error) {
      res.status(500).send("Error eliminando rol: " + error.message);
    }
  };
  
const updateRoleHandler = async (req, res) => {
    const{ id } = req.params
    const newRole=req.body
    try {

      const rolActualizado = await updateRole(id,newRole);

      res.status(200).json({
        message: "rol actualizado correctamente",
      });
      
    } catch (error) {
      res.status(500).send("Error actualizando roles: " + error.message);
    }
  };
  
  module.exports = { 
    postRoleHandler ,
     getAllRolesHandler ,
     deleteRoleHandler ,
     updateRoleHandler };
