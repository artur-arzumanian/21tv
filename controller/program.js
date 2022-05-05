const Program = require('../model/program')
const ProgramType = require('../model/prograqm_type')

exports.addProgram = async (req,res) => {

  if(Object.keys(req.body).length === 0){
    return res.status(400).send({message: "Content can not be empty"})
  }

  let program = await Program.findOne({name: req.body.name})
  if(program){
    return res.status(400).send({error: 'Program name must be unique.'})
  }

  const type_id = req.body.program_type_id
  let program_type = await ProgramType.findOne({_id: type_id})
  if(!program_type){
    return res.status(400).send({error: 'Program type not found.'})
  }

  program = new Program({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    banners_order: req.body.banners_order,
    program_type_id: program_type._id
  })

  try{
    await program.save()
    res.status(201).send(program)
  }catch(error){
    res.status(500).send(error);
  } 
}

exports.getPrograms = async (req,res)=>{

  try{
    const programs = await Program.find({})
    if(!programs){
      return res.status(404).send({error: `Programs don\'t exist`})
    }
    res.status(200).send(programs)
  }catch(error){
    res.status(500).send(error)
  }
}

exports.getProgramById = async (req,res)=>{
  const type_id = req.params.id
  try{
    const program = await Program.find({program_type_id: type_id})
    res.status(200).send(program)
  }catch(error){
    res.status(500).send(error)
  }
}

exports.editProgram = async (req,res)=>{
  const id = req.params.id
  if(Object.keys(req.body).length === 0){
    return res.status(400).send({message: "Content can not be empty"})
  }
  let {description,image,program_type_id} = req.body
  let program_type = await ProgramType.findOne({_id: program_type_id})
  if(program_type){
    program_type_id = program_type._id
  }
 
  try{
    const updatedProgram = await Program.findByIdAndUpdate({_id: id}, {
      description,
      image,
      program_type_id
    },{ new: true })
    if(!updatedProgram){
      return res.status(400).send({error: `Program with id ${id} does not exist`})
    }
    await updatedProgram.save()
    res.status(200).send(updatedProgram)
  }catch(error){
    res.status(500).send(error)
  }
}

exports.deleteProgram = async (req,res) => {
  const _id = req.params.id
  try{
    const deletedProgram = await Program.findByIdAndDelete({_id: _id})
    if(!deletedProgram){
      return res.status(400).send({error: `Program  not found`})
    }
    res.status(200).send(deletedProgram)
  }catch(error){
    res.status(500).send(error)
  }
}


