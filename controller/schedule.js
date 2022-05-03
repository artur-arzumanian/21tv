const Schedule = require('../model/schedule')
const { rrulestr }  = require('rrule')
const {getDate, getMilliseconds,existingDateTime} = require('../utils/date')

exports.addSchedule = async (req,res)=> {
  const {startDate,endDate,rRule, appointmentId,image,programId} = req.body  
  const startTime = getMilliseconds(startDate)
  const endTime = getMilliseconds(endDate)
  const rruleDates = rrulestr(rRule).all()
  const freqType = rrulestr(rRule).options.freq
  const dates = []
  
  for(let i = 0; i < rruleDates.length; i++){
    const date = new Date(rruleDates[i])
    dates.push(getDate(date))
  }
 
  const existDateTime = await existingDateTime(startTime,endTime,dates)
  if(existDateTime){
    return res.status(400).send(existDateTime)
  }

  const schedule = new Schedule({
    programId,
    startDate,
    endDate,
    rRule,
    appointmentId,
    image,
    startTime,
    endTime,
    dates,
    freqType
  })

  try{
    await schedule.save()
    res.status(201).send(schedule)
  }catch(error){
    res.status(500).send(error);
  }
}

exports.getSchedule = async (req,res) => {
  try{
    const schedule = await Schedule.find({})
    if(!schedule || schedule === {}){
      return res.status(404).send({error: `Schedule doesn\'t exist`})
    }
    res.status(200).send(schedule)
  }catch(error){
    res.status(500).send(error)
  }

}

exports.getScheduleById = async (req,res) => {
  const schedule_id = req.params.id
  try{  
    const schedule = await Schedule.findOne({_id: schedule_id})
    res.status(200).send(schedule)
  }catch(error){
    res.status(500).send(error)
  }

}

exports.updateSchedule = async (req,res) => {
  const schedule_id = req.params.id
  let {startDate,endDate,rRule, appointmentId,image,programId} = req.body
  const startTime = getMilliseconds(startDate)
  const endTime = getMilliseconds(endDate)
  const rruleDates = rrulestr(rRule).all()
  const freqType = rrulestr(rRule).options.freq
  const dates = []
  
  for(let i = 0; i < rruleDates.length; i++){
    const date = new Date(rruleDates[i])
    dates.push(getDate(date))
  }
 
  const existDateTime = await existingDateTime(startTime,endTime,dates,schedule_id)
  if(existDateTime){
    return res.status(400).send(existDateTime)
  }

  const editedSchedule = {
    programId,
    startDate,
    endDate,
    rRule,
    appointmentId,
    image,
    startTime,
    endTime,
    dates,
    freqType
  }
  try{
    const updatedSchedule = await Schedule.findByIdAndUpdate({_id: schedule_id}, editedSchedule, { new: true })
    await updatedSchedule.save()
    res.status(200).send(updatedSchedule)
  }catch(error){
    res.status(500).send(error)
  }

}


exports.deleteSchedule = async (req,res) => {
  const _id = req.params.id
  try{
    const deletedSchedule = await Schedule.findByIdAndDelete({_id: _id})
    if(!deletedSchedule){
      return res.status(400).send({error: `Schedule not found`})
    }
    res.status(200).send(deletedSchedule)
  }catch(error){
    res.status(500).send(error)
  }

}