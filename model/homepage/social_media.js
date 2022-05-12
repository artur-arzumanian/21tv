const mongoose = require('mongoose')

const socialMediaSchema = mongoose.Schema({
  
  title: {
    am: {type: String},
    ru: {type: String},
    en: {type: String},
  },

  description: {
    am: {type: String},
    ru: {type: String},
    en: {type: String},
  },

  facebookLink: {
    type: String
  },

  twitterLink: {
    type: String
  },

  youtubeLink: {
    type: String
  },
  
  instagramLink: {
    type: String
  }
  
})

const Media = mongoose.model('social_media', socialMediaSchema)
module.exports = Media