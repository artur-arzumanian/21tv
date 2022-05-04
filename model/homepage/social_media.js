const mongoose = require('mongoose')

const socialMediaSchema = mongoose.Schema({
  text: {
    title: {
      type: String
    },

    description: {
      type: String
    }
  },

  links: {
    facebook: {type: String},
    twitter: {type: String},
    youtube: {type: String},
    instagram: {type: String}
  },
})

const Media = mongoose.model('social_media', socialMediaSchema)
module.exports = Media