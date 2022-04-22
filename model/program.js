const mongoose = require('mongoose')

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true,
    unique: true
  },

  description: {
    type: String,
    required: true
  },

  picture: {
    type: String,
    required: true

  },

  program_type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProgramType',
    required: true
  }
})

const Program = mongoose.model('program', programSchema)
module.exports = Program