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
    type: Object,
    ref: 'ProgramType'
  }
})

const Program = mongoose.model('program', programSchema)
module.exports = Program