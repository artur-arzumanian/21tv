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

  return res.status(200).send("succes")
  // const {email,phone,firstName,lastName,text} = req.body
  // var smtpTransport = require('nodemailer-smtp-transport');
  // var handlebars = require('handlebars');
  // var fs = require('fs');
 
  // const {google} = require('googleapis')
  // console.log("aaaaaaaa");
  // const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
  // console.log(oAuth2Client);
  // oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})

  // const accessToken = await new Promise((resolve, reject) => {
  //   console.log("aaaa");
  //   oAuth2Client.getAccessToken((err, token) => {
  //     console.log("err: ", err);
  //     console.log("token: ", token);
  //     if (err) {
  //       reject();
  //     }
  //       resolve(token);
  //     });
  // });

  // var readHTMLFile = function(path, callback) {
  //   fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
  //       if (err) {
  //         console.log("readHTMLFile =", err);
  //         callback(err); 
  //         throw err;
            
  //       }
  //       else {
  //         callback(null, html);
  //       }
  //   });
  // };

  // smtpTransport = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     type: 'OAuth2',
  //     user: process.env.AUTH_USER,
  //     clientId: process.env.CLIENT_ID,
  //     clientSecret: process.env.CLIENT_SECRET,
  //     refreshToken: process.env.REFRESH_TOKEN,
  //     accessToken: accessToken
  //   },
  //   tls: {rejectUnauthorized: false}
  // });

  // readHTMLFile(__dirname + '/../emailTamplate/emailTamplate.html', function(err, html) {
  
  //   var template = handlebars.compile(html);
  //   var replacements = {
  //     lastName,
  //     firstName,
  //     email,
  //     phone,
  //     text
  //   };
  //   var htmlToSend = template(replacements);
  //   var mailOptions = {
  //     to: "21tv.development@gmail.com",
  //     subject: "Contact us",
  //     attachments: [
  //       {
  //         filename: 'email.png',
  //         path: __dirname +'/../public/email_img/email.png',
  //         cid: 'emailImg'
  //       },
  //       {
  //         filename: 'phone.png',
  //         path: __dirname +'/../public/email_img/phone.png',
  //         cid: 'phoneImg'
  //       },
      
  //       {
  //         filename: 'logo.png',
  //         path:  __dirname + '/../public/email_img/logo.png',
  //         cid: 'logoImg'
  //       }
  //     ],
  //     html: htmlToSend
  //   }; 
    
  //   smtpTransport.sendMail(mailOptions, function (error, response) {
  //     if (error) {
        
  //       res.status(500).send({msg: "Email hasn't been sent", error})
  //     }else{
  //       res.send("Email has been sent");
  //     }
  //   }); 
  // }); 
 
}
