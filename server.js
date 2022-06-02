const express = require('express')
const cors = require("cors")
const path = require('path')
const router = require('./config/routes')
const corsOptions = require('./utils/cors-option')
require('./db/mongoose.js')
require('dotenv').config()
const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static('./public'));

app.use(router)

const fs = require('fs');
const dir = './public/images';
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir, { recursive: true });
}
 
const port = process.env.PORT ||  process.env.LOCAL_PORT

app.listen(port, ()=>{
  console.log(`Server is listening on port ${port}`)
})

