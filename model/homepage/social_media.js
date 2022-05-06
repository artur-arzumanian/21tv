const mongoose = require('mongoose')

const socialMediaSchema = mongoose.Schema({
  
  title: {
     type: String
  },

  description: {
    type: String
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