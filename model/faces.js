const mongoose = require('mongoose')

const facesSchema = mongoose.Schema({
  image: {
    type: String,
    require: true
  },
  firstName: {
    type: String,
    require: true
  },

 lastName: {
    type: String,
    require: true
  },

  role: {
    type: String,
    require: true
  },

  description: {
    type: String,
    require: true
  },

  shortDescription: {
    type: String,
    require: true
  },

  facebookLink: {
    type: String
  },
 
  instagramLink: {
    type: String
  }

})

const Faces = mongoose.model('faces', facesSchema)
module.exports = Faces
