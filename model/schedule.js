const mongoose =require('mongoose')

const scheduleSchema = mongoose.Schema({
  startDate: {
    type: Date,
    required: true
  },

  endDate: {
    type: Date,
    required: true
  },

  custom: {
    type: Number,
    required: true
  }

})