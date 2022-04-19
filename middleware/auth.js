const jwt = require('jsonwebtoken')
const Admin = require('../model/admin')
require('dotenv').config()

const auth = async (req, res, next) => {
  try{
    const token = await req.header('Authorization').replace('Bearer ', '')
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }

    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
    const admin = await Admin.findOne({_id: decoded._id})
    
    if(!admin){
      throw new Error()
    }

    if(admin.isAdmin === false){
      return res.status(403).send({error: 'You haven\'t permission'})
    }

    req.token = token
    req.admin = admin
    next()
  }catch(e){
    res.status(403).send({error: 'Please authenticate!'})
  } 
  
}

module.exports = auth
