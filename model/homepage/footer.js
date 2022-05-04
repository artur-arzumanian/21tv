const mongoose = require('mongoose')

const footerSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  }
})

const Footer = mongoose.model('footer', footerSchema)
module.exports = Footer