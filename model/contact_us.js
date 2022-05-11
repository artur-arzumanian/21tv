const mongoose  = require('mongoose')
const validator = require('validator')

const contactUsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
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

  phone: {
    type: String,
    unique: true,
    required: true
  },

  address: {
    type: String,
    required: true
  }

})

const Contact = mongoose.model("contact_us",contactUsSchema)
module.exports = Contact