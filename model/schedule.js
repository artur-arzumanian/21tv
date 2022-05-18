const mongoose = require('mongoose')

const scheduleSchema = mongoose.Schema({

  programId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'program'
  },

  name: {
    am: {type: String, required: true},
    en: {type: String, required: true},
    ru: {type: String, required: true},
  },

  id: {
    type: Number,
    required: true
  },

  startTime: {
    type: Number
  },

  endTime: {
    type: Number
  },

  startDate: {
    type: Date,
    required: true
  },
  
  endDate: {
    type: Date,
    required: true
  },

  appointmentId: {
    type: Number,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  rRule: {
    type: String,
    required: true
  },

  dates: {
    type: Array
  },

  freqType: {
    type: Number
  }

})

const Schedule = mongoose.model('schedule', scheduleSchema)
module.exports = Schedule