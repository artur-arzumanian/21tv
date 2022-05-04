const Footer = require('../../model/homepage/footer')

exports.addFooter = async (req,res) => {
  const footer = new Footer(req.body)

  try{
    await footer.save();
    res.status(201).send(footer)
  }catch(error){
    res.status(500).send(error)
  }
}

exports.getFooter = async (req,res) => {
  try{
    const footer = await Footer.find({})  
    res.status(200).send(footer)   
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.getFooterById = async (req,res) => {
  try{
    const footer = await Footer.findOne({_id: req.params.id})  
    res.status(200).send(footer)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.editFooter = async (req,res) => {
  const id = req.params.id
  try{
    const footer = await Footer.findByIdAndUpdate({_id: id}, {title: req.body.title})
    await footer.save()
    res.status(200).send(footer)
  }catch(error){
    res.status(500).send(error.message)
  }

}

exports.deleteFooter = async (req,res) => {
  const id = req.params.id
  try{
    const deletefooter = await Footer.findByIdAndDelete({_id: id})
    if(!deletefooter){
      return res.status(400).send("Footer hasn't found")
    }
    res.status(200).send(deletefooter)
  }catch(error){
    res.status(500).send(error.message)
  }
}