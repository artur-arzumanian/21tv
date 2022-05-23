const ProgramHistory = require('../model/program_history')
const Program = require('../model/program')

exports.addProgramHistory = async (req, res) => {
  let program = await Program.findOne({_id: req.body.programId})
  if(!program){
    return res.status(400).send({error: 'Program not found.'})
  }

  const programHistory = new ProgramHistory({
    programId: program._id,
    episode: req.body.episode,
    link: req.body.link,
    title: req.body.title,
    duration: req.body.duration,
    image: req.body.image,
    date: req.body.date
  })

  try{
    await programHistory.save()
    res.status(201).send(programHistory)
  }catch(error){
    res.status(500).send(error);
  }
}


exports.getProgramHistories = async (req,res)=>{

  try{
    const programHistories = await ProgramHistory.find({})
    if(!programHistories){
      return res.status(404).send({error: `Programs histories are empty`})
    }
    res.status(200).send(programHistories)
  }catch(error){
    res.status(500).send(error)
  }
}

exports.getProgramHistoryById = async (req,res)=>{

  try{
    const programHistory = await ProgramHistory.find({programId: req.params.id})
    if(!programHistory){
      return res.status(404).send({error: `Program histories are empty`})
    }
    res.status(200).send(programHistory)
  }catch(error){
    res.status(500).send(error)
  }
}


exports.editProgramHistory = async (req, res) => {
  let {programId,title,episode,link,image,duration,date} = req.body
  if(programId){
    let program = await Program.findOne({_id: programId})
    if(program){
      programId = program._id
    }  
  }

  try{
    const editedHistory = await ProgramHistory.findOneAndUpdate({_id: req.params.id},{
      programId,
      title,
      episode,
      link,
      image,
      duration,
      date
    },{new: true})

    await editedHistory.save()
    res.status(200).send(editedHistory)
  }catch(error){
    res.status(500).send(error)
  }
 
}

exports.deleteProgramHistory = async (req,res) => {
  const _id = req.params.id
  try{
    const deletedProgramHistory = await ProgramHistory.findByIdAndDelete({_id: _id})
    if(!deletedProgramHistory){
      return res.status(400).send({error: `Program  not found`})
    }
    res.status(200).send(deletedProgramHistory)
  }catch(error){
    res.status(500).send(error)
  }

}

exports.search = async (req,res) =>{
  try{
    const search = await ProgramHistory.find(
      {
        "$or": [
          {"title.am": {$regex: req.params.key, $options: 'i'}},
          {"title.ru": {$regex: req.params.key, $options: 'i'}},
          {"title.en": {$regex: req.params.key, $options: 'i'}}  
        ]
      })
      console.log(search);
      console.log(req.params.key);
    res.status(200).send(search)
  }catch{
    res.status(500).send(error.message)
  }
}

exports.getProgramHistoryByProgramId = async (req,res)=>{

  try{
    let {page, size} = req.query
    if(!page){
      page = 1
    };
    if(!size){
      size = 10
    };
    const limit  = parseInt(size)
    const skip = (page -1) * size
    const programHistories = await ProgramHistory.find({programId: req.params.programId}).limit(limit).skip(skip)
    if(!programHistories){
      return res.status(404).send({error: `Programs histories are empty`})
    }
    res.status(200).send({page, size, programHistories})
  }catch(error){
    res.status(500).send(error)
  }
}