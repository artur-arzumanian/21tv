const Schedule = require('../model/schedule')

exports.addSchedule = async (req,res)=> {
  
  const schedule = new Schedule(req.body)  

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
    if(!schedule){
      return res.status(404).send({error: `Schedule don\'t exist`})
    }
    res.status(200).send(schedule)
  }catch(error){
    res.status(500).send(error)
  }

}

exports.getScheduleById = async (req,res) => {
  const schedule_id = req.params.id
  try{  
    const schedule = await Program.findOne({_id: schedule_id}) 
    res.status(200).send(schedule)
  }catch(error){
    res.status(500).send(error)
  }

}

exports.updateSchedule = async (req,res) => {
  const schedule_id = req.params.id
  const newSchedule =  { 
    programId: req.body.programId, 
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    appointmentId: req.body.endTime,
    img: req.body.img,
    rRule: req.body.rRule } 
  try{
    const updatedSchedule = await Schedule.findByIdAndUpdate({_id: schedule_id}, newSchedule, { new: true })
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