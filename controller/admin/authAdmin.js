const Admin = require('../../model/admin')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
require('dotenv').config()

exports.login = async (req,res) => {
  const {email, password} = req.body
  
  const admin = await Admin.findOne({email: email})
   
  if(!admin){
    return res.status(400).send('Email is not found')
  }

  const validPass = await bcrypt.compare(password, admin.password)
  if(!validPass){
    return res.status(400).send('Invalid passsword')
  }

  try{
    const token = await admin.generateAuthToken()
    return res.status(200).send(token);   
  
  } catch(error) {
    return res.status(400).send(error);
  }  

}

exports.changePassword = async (req,res)=>{
  const {newPassword, oldPassword, confirmPassword} = req.body
  const token = await req.header('Authorization').replace('Bearer ', '')

  let admin = await Admin.findOne({'token': token})
  if(!admin){
   return res.status(400).send('Admin with this token doesn\'t exist')
  }
  const comparePassword =  bcrypt.compare(oldPassword, admin.password)
  if(!comparePassword){
    return res.status(400).send({error: 'Password is wrong. Please enter correct password'})
  }

  if(!newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)){
    return res.status(400).send({error:' Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'})
  }

  if(confirmPassword !== newPassword){
    return res.status(400).send({error:' Passwords don\'t match'})
  }

  admin.password = newPassword
  try{
    await admin.save()
    return res.status(200).send('Password has been changed')
  }catch(error){
    return res.status(400).send(error)
  }

}

exports.forgotPassword = async (req, res) => {
  const {email} = req.body

  const admin = await Admin.findOne({email})
  if(!admin){
    return res.status(400).send('Admin with this email doesnt exist')
  }

  const token = jwt.sign({_id: admin._id, msg: process.env.JWT_MSG},process.env.JWT_PRIVATE_KEY,{expiresIn: '15m'})

  let mailTransporter = nodemailer.createTransport({
    service: "gmail",  
    auth: {
      user: "21tv.development@gmail.com",
      pass: "!!dar21)tv128"
    }
  });
  try{
    await mailTransporter.sendMail({
      from: "21tv.development@gmail.com",
      to: email,
      subject: "Reset password",
      text: "Password changing link",    
      html: `<h2>Please click on given link to change your password <h2>
      <p>${process.env.HEROKU_ADMIN}/reset-password/${token}<p>`
    })
    res.send("Password reset link has been sent to your email");
  }catch(error){
    res.status(400).send(error)
  }

}

exports.resetPassword = async (req,res) => {
  try{
    const {password, confirmPassword,token} = req.body
    
    if(!token){
      return res.status(400).send({error: 'Incorrect or Expired link.'})
    }
     
    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
    if(!decodedToken){
      return res.status(400).send({error: 'Incorrect or Expired link.'})
    }

    const admin = await Admin.findOne({_id: decodedToken._id})
    if(!admin){
      return res.status(400).send({error: 'Admin with this email doesnt exist.'})
    }

    if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)){
      return res.status(400).send({error:' Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'})
    }
    
    if(confirmPassword !== password){
      return res.status(400).send({error:' Passwords don\'t match'})
    }

    admin.password = password
    await admin.save()
    return res.status(200).send("Password has been sucessfully reseted .");
  }catch (error) {
    res.send("An error occured");
    console.log(error);
  }
}