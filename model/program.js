const mongoose = require('mongoose')

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },

  describtion: {
    type: String
  },

  picture: {
    type: String
  },

  program_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProgramType'
  }
})

const Program = mongoose.model('program', programSchema)
module.exports = Program