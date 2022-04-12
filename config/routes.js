const express = require('express')
const upload = require('../middleware/uploadMiddleware');
const route = new express.Router()
const {translation} = require('../controller/translation')
const {addProgramType,getProgramTypes,getProgramType,deleteProgramType} = require('../controller/prograqm_type')
const {addProgram,getPrograms,getProgramById,editProgram,deleteProgram} = require('../controller/program')
const {uploadImage,getFile} = require('../controller/upload')

route.get('/test', (req, res) => {
  res.send("This is test");
})
route.post('/translation', translation)
route.post('/addProgram_type', addProgramType)
route.get('/getProgramTypes', getProgramTypes)
route.get('/getProgramType/:id', getProgramType)
route.delete('/deleteProgramType/:id', deleteProgramType)
route.post('/addProgram', addProgram)
route.get('/getPrograms', getPrograms)
route.get('/getProgram/:id', getProgramById)
route.put('/editProgram/:id', editProgram)
route.delete('/deleteProgram/:id', deleteProgram)
route.post('/upload-image', upload, uploadImage )
route.get('/getImage/:key', getFile)


module.exports = route