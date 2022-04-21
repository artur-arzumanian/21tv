const mongoose = require('mongoose')

const scheduleSchema = mongoose.Schema({

  programId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Program'
  },

  startTime: {
    type: String,
    required: true
  },

  endTime: {
    type: String,
    required: true
  },

  appointmentId: {
    type: Number,
    required: true
  },

  img: {
    type: String,
    required: true
  },

  rRule: {
    type: String,
    required: true
  },

  notes: {
    type: String
  },

  id: {
    type: Number
  }
  

})

const Schedule = mongoose.model('schedule', scheduleSchema)
module.exports = Schedule