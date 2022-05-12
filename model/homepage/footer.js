const mongoose = require('mongoose')

const footerSchema = mongoose.Schema({
  title: {
    am: {type: String},
    ru: {type: String},
    en: {type: String},
  },
})

const Footer = mongoose.model('footer', footerSchema)
module.exports = Footer