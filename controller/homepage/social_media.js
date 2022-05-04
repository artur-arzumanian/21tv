const Media = require('../../model/homepage/social_media')

exports.addSocialMediaLink = async (req,res) => {
  const socialLink = new Media(req.body)
  if(!socialLink){
    res.status(400).send(error)
  }
  try{
    await socialLink.save();
    res.status(201).send(socialLink)
  }catch(error){
    res.status(500).send(error)
  }
}

exports.getSocialMediaLinks = async (req,res) => {
  try{
    const socialMediaLink = await Media.find({})  
    res.status(200).send(socialMediaLink)   
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.getSocialMediaLinkById = async (req,res) => {
  const id = req.params.id
  try{
    const socialMediaLink = await Media.findOne({_id: id})  
    res.status(200).send(socialMediaLink)   
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.editSocialMediaLink = async (req,res) => {
  const id = req.params.id
  const socialMedia = req.body
  console.log(typeof socialMedia,socialMedia);
  try{
    const editedMedia = await Media.findByIdAndUpdate({_id: id}, socialMedia, {new: true})
    await editedMedia.save()
    res.status(200).send(editedMedia)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.deleteSocialMediaLink = async (req,res) => {
  const id = req.params.id

  try{
    const deleteLink = await Media.findByIdAndDelete({_id: id})
    if(!deleteLink){
      return res.status(400).send("Social Media hasn't found")
    }
    res.status(200).send(deleteLink)
  }catch(error){
    res.status(500).send(error.message)
  }
}