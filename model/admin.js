const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt    = require('bcryptjs')

const AdminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,

  },

  email:{
    type: String,
    required: true,
    unique:true,
    trim: true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error('Email is invalid!')
        }
    }

  },
  password:{
    type:String,
    required:true,
    trim:true,
    minlength: 7,
    validate(value){
      if(validator.isEmpty(value)){
        throw new Error('Please enter your password!')
      }else if(validator.equals(value.toLowerCase(),"password")){
        throw new Error('Password is invalid!')
      }else if(validator.contains(value.toLowerCase(), "password")){
        throw new Error('Password should not contain password!')
      }
    }
  },

  isAdmin: {
    type: Boolean,
    default: false
  },

  // tokens:[{
  //   token:{
  //     type:String  
  //   }
  // }],

  token:{
    type: String,
    default: '' 
  }

})

// AdminSchema.methods.generateAuthToken = async function() {
//   const admin = this
//   const token = jwt.sign({ _id: admin._id.toString(), email: admin.email }, process.env.JWT_PRIVATE_KEY,{expiresIn: '1h'});
//   admin.tokens = admin.tokens.concat({token})
//   await admin.save()
//   return token
// };
AdminSchema.methods.generateAuthToken = async function() {
  const admin = this
  const token = jwt.sign({ _id: admin._id.toString(), email: admin.email }, process.env.JWT_PRIVATE_KEY,{expiresIn: '1m'});
  admin.token = token
  await admin.save()
  return token
};

AdminSchema.pre('save', async function(next){
  const admin = this
  if(admin.isModified('password')){
      admin.password = await bcrypt.hash(admin.password, 8)
  }
  next()
})

AdminSchema.methods.toJSON = function(){
  const admin = this
  const adminObject = admin.toObject()
  delete adminObject.password
  return adminObject
}

const Admin = mongoose.model('admin', AdminSchema);

// const admin = Admin.create({
//   name: "admin2",
//   email: "admin2@example.com",
//   password: "!123Dar21",
//   isAdmin: true
// })
// console.log(admin);

module.exports = Admin



