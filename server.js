const express = require('express')
const router = require('./config/routes')
require('./db/mongoose.js')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(express.static('public'));
app.use(router)


app.listen(process.env.PORT, ()=>{
  console.log(`Server is listening on port ${process.env.PORT}`)
})