const express = require('express')
const router = require('./config/routes')
require('./db/mongoose.js')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(express.static('public'));
app.use(router)
const port = process.env.PORT || 5000

app.listen(port, ()=>{
  console.log(`Server is listening on port ${port}`)
})