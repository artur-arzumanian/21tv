const mongoose = require('mongoose')

const socialMediaSchema = mongoose.Schema({
  
  title: {
     type: String
  },

  description: {
    type: String
  },

  facebookPage: {
    type: String
  },

  twitterPage: {
    type: String
  },

  youtubePage: {
    type: String
  },
  instagramPage: {
    type: String
  }
  
})

const Media = mongoose.model('social_media', socialMediaSchema)
module.exports = Media