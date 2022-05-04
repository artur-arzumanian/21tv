const mongoose = require('mongoose')

const historySchema = mongoose.Schema({
  programId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
    required: true
  },

  episode: {
    type: Number,
    required: true 
  },

  link: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true,
  },

  duration: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true

  }
},{timestamps: true})

const ProgramHistory = mongoose.model('program_history', historySchema)
module.exports = ProgramHistory