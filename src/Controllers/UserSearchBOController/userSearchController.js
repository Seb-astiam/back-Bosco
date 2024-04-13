 const userSearchHandler = require('../../Handlers/UserSearchBOhandler/userSearchHandler')

 const userSearchController = async(req,res)=>{
  const {email}= req.query
  console.log('soy la query',req.query);
  
 

  try {
 const usersearch =await userSearchHandler(email)
    res.status(200).json(usersearch)
    
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }


 }
 module.exports = userSearchController;
