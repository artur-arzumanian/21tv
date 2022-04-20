const express = require('express')
const upload = require('../middleware/uploadMiddleware');
const auth = require('../middleware/auth')
const route = new express.Router()
const {translation} = require('../controller/translation')
const {addProgramType, getProgramTypes, getProgramType, deleteProgramType} = require('../controller/prograqm_type')
const {addProgram, getPrograms, getProgramById, editProgram, deleteProgram} = require('../controller/program')
const {uploadImage,getFile} = require('../controller/upload')
const {login,logout,changePassword,forgotPassword,resetPassword} = require('../controller/admin/authAdmin')




route.post('/translation',auth, translation)
route.post('/add-program-type',auth, addProgramType)
route.get('/get-program-types',auth, getProgramTypes)
route.get('/get-program-type/:id',auth, getProgramType)
route.delete('/delete-program-type/:id',auth, deleteProgramType)
route.post('/add-program',auth, addProgram)
route.get('/get-programs', getPrograms)
route.get('/get-program/:id', getProgramById)
route.put('/edit-program/:id',auth, editProgram)
route.delete('/delete-program/:id',auth, deleteProgram)
route.post('/upload-image',auth, upload, uploadImage )
route.get('/get-image/:key',auth, getFile)


// admin route
route.post('/admin/login', login)
route.post('/admin/logout', logout)
route.put('/admin/change-password', auth, changePassword)
route.post('/admin/forgot-password', forgotPassword)
route.post('/admin/reset-password',resetPassword)

module.exports = route