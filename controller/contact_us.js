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
  var smtpTransport = require('nodemailer-smtp-transport');
  var handlebars = require('handlebars');
  var fs = require('fs');

 

  try{
    var readHTMLFile = function(path, callback) {
      fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
          if (err) {
             callback(err); 
             throw err;
              
          }
          else {
              callback(null, html);
          }
      });
    };
  
    smtpTransport = nodemailer.createTransport(smtpTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      service: 'gmail',
      auth: {
        user: "21tv.development@gmail.com",
        pass: "!!dar21)tv128"
      },
      tls: {rejectUnauthorized: false}
    }));

    readHTMLFile(__dirname + '/../emailTamplate/emailTamplate.html', function(err, html) {
    
      var template = handlebars.compile(html);
      var replacements = {
        lastName,
        firstName,
        email,
        phone,
        text
      };
      var htmlToSend = template(replacements);
      var mailOptions = {
        to: "21tv.development@gmail.com",
        subject: "Contact us",
        attachments: [
          {
            filename: 'email.png',
            path: __dirname +'/../public/images/email.png',
            cid: 'emailImg'
          },
          {
            filename: 'phone.png',
            path: __dirname +'/../public/images/phone.png',
            cid: 'phoneImg'
          },
        
          {
            filename: 'logo.png',
            path: __dirname +'/../public/images/logo.png',
            cid: 'logoImg'
          }
        ],
        html: htmlToSend
      };

      smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
          callback(error);
        }
      });
      
    });

    res.send("Email has been sent");
   
  }catch(error){
    res.status(500).send("Email hasn't been sent")
  }
}