const mongoose = require('mongoose')

const facesSchema = mongoose.Schema({
  image: {
    type: String,
    require: true
  },

  firstName: {
    am: {type: String},
    ru: {type: String},
    en: {type: String},
  },
  
  lastName: {
    am: {type: String},
    ru: {type: String},
    en: {type: String},
  },

  role: {
    am: {type: String},
    ru: {type: String},
    en: {type: String},
  },

  description: {
    am: {type: String},
    ru: {type: String},
    en: {type: String},
  },

  shortDescription: {
    am: {type: String},
    ru: {type: String},
    en: {type: String},
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
