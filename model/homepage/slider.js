const mongoose = require('mongoose')

const sliderSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    required: true,
  },

  order: {
    type: Number,
    required: true,
  },

  serialID: {
    type: Number,
    required: true,
  }
})

const Slider = mongoose.model('slider', sliderSchema)
module.exports = Slider