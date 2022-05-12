const Contact = require('../model/contact_us')
const nodemailer = require('nodemailer')


exports.addContact = async (req,res) => {
  const contact = new Contact(req.body)
  try{
    await contact.save()
    res.status(201).send(contact)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.getContact = async (req,res) => {
  try{
    const contact = await Contact.find({})
    res.status(200).send(contact)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.editContact = async (req,res) => {
  const contact = req.body
  try{
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, contact, {new: true})
    if(!updatedContact){
      return res.status(400).send(`Contact with id ${req.params.id} doesn't exist`)
    }

    await updatedContact.save()
    res.status(200).send(updatedContact)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.deleteContact = async (req,res) => {
  try{
    const deleteContact = await Contact.findByIdAndDelete(req.params.id)
    if(!deleteContact){
      return res.status(400).send("Contact hasn't found")
    }
    res.status(200).send(deleteContact)
  }catch(error){
    res.status(500).send(error.message)
  }
}


exports.sendEmailTo21TV = async (req,res) => {
  const {email,phone,firstName,lastName,text} = req.body

  let mailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
      user: "21tv.development@gmail.com",
      pass: "!!dar21)tv128"
    }
  });

  try{
    await mailTransporter.sendMail({
      to: "21tv.development@gmail.com",
      subject: "Contact us",
      text:" description",
      html: `<h3>Contact Details</h3>  
            <ul>
              <li>  Name: ${firstName}   </li>
              <li>  Surname: ${lastName} </li>
              <li>  Email: ${email} </li>
              <li>  Phone: ${phone}   </li>
            </ul> <br><br>
            <h3>Message</h3> 
            <p>${text}</p>`,
      
      
    })
    res.send("Email has been sent");
  }catch(error){
    res.status(400).send(error)
  }
}