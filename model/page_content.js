const mongoose = require('mongoose')

const pageContentSchema = mongoose.Schema({
  image: {
    type: String,
    require: true
  },

  title: {
    type: String,
    require: true,
    unique: true
  }
})

const PageContent = mongoose.model('page-content', pageContentSchema)
module.exports = PageContent