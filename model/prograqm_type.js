const mongoose = require('mongoose')

const program_typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

const ProgramType = mongoose.model('program_type', program_typeSchema)

module.exports = ProgramType