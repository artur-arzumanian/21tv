const mongoose = require('mongoose')

const sliderSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },

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

  link: {
    type: String,
    required: true,
  },

  slider_order: {
    type: Number,
    required: true,
  }
})

const Slider = mongoose.model('slider', sliderSchema)
module.exports = Slider