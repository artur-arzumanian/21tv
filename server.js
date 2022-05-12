const express = require('express')
const cors = require("cors")
const router = require('./config/routes')
const corsOptions = require('./utils/cors-option')
require('./db/mongoose.js')
require('dotenv').config()
const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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