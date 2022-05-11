const express = require('express')
const route = new express.Router()
const upload = require('../middleware/uploadMiddleware');
const auth = require('../middleware/auth')
const {translation} = require('../controller/translation')
const {addProgramType, getProgramTypes, getProgramType, deleteProgramType} = require('../controller/prograqm_type')
const {addProgram, getPrograms, getProgramById,getProgramByTypeId, editProgram, deleteProgram, saveBanners} = require('../controller/program')
const {uploadImage,getFile} = require('../controller/upload')
const {login,logout,changePassword,forgotPassword,resetPassword} = require('../controller/admin/authAdmin')
const {addSchedule,getSchedule,getScheduleById,updateSchedule,deleteSchedule} = require('../controller/schedule')
const {addProgramHistory,getProgramHistories,getProgramHistoryById,editProgramHistory,deleteProgramHistory} = require('../controller/program_history')
const {addSlider,getSliders,getSliderById,editSlider,deleteSlider, saveSlider} = require('../controller/homepage/slider')
const {addLiveLink,getLiveLink,getLiveLinkById,deleteLiveLink} = require('../controller/homepage/live')
const {addSocialMediaLink,getSocialMediaLinkById,getSocialMediaLinks,editSocialMediaLink,deleteSocialMediaLink} = require('../controller/homepage/social_media')
const {addFooter,getFooter,getFooterById,editFooter,deleteFooter} = require('../controller/homepage/footer')
const {addBanner,getBanners,getBannerById,editBanner,deleteBanner} = require('../controller/homepage/program-show_banners')
const {addPageContent,getPageContent,editPageContent,deletePageContent} = require('../controller/page-content');
const { addFace, getFaces,getFaceById,editFace,deleteFace } = require('../controller/faces');
const {addContact,getContact,editContact,deleteContact,sendEmailTo21TV} = require('../controller/contact_us') 

// admin route
route.post('/admin/login', login)
route.post('/admin/logout', logout)
route.put('/admin/change-password', auth, changePassword)
route.post('/admin/forgot-password', forgotPassword)
route.post('/admin/reset-password',resetPassword)

//upload route
route.post('/upload-image',auth, upload, uploadImage )
route.get('/get-image/:key',auth, getFile)

//translation
route.post('/translation',auth, translation)

//program-types route
route.post('/add-program-type',auth, addProgramType)
route.get('/get-program-types', getProgramTypes)
route.get('/get-program-type/:id', getProgramType)
route.delete('/delete-program-type/:id',auth, deleteProgramType)

//program route
route.post('/add-program',auth, addProgram)
route.get('/get-programs', getPrograms)
route.get('/get-program/:id', getProgramById)
route.get('/get-program-by-type/:id', getProgramByTypeId)
route.put('/edit-program/:id',auth, editProgram)
route.delete('/delete-program/:id',auth, deleteProgram)
route.put('/update-banners', saveBanners)

//schedule route
route.post('/add-schedule', auth, addSchedule)
route.get('/get-schedules', getSchedule)
route.get('/get-schedule/:id', getScheduleById)
route.put('/update-schedule/:id', auth, updateSchedule)
route.delete('/delete-schedule/:id', auth, deleteSchedule)

//program history routes
route.post('/add-program-history',auth, addProgramHistory)
route.get('/get-program-histories', getProgramHistories)
route.get('/get-program-history/:id', getProgramHistoryById)
route.put('/edit-program-history/:id', auth,editProgramHistory)
route.delete('/delete-program-history/:id', auth, deleteProgramHistory)

//homepage slider routes
route.post('/add-slider', addSlider)
route.get('/get-sliders', getSliders)
route.get('/get-slider/:id', getSliderById)
route.put('/edit-slider/:id', editSlider)
route.put('/save-slider', saveSlider)
route.delete('/delete-slider/:id', deleteSlider)

//homepage Live Link routes
route.post('/add-livelink', addLiveLink)
route.get('/get-livelink', getLiveLink)
route.get('/get-livelink/:id', getLiveLinkById)
route.delete('/delete-livelink/:id', deleteLiveLink)

//homepage Banners routes
route.post('/add-banner', addBanner)
route.get('/get-banners', getBanners)
route.get('/get-banner/:id', getBannerById)
route.put('/edit-banner/:id', editBanner)
route.delete('/delete-banner/:id', deleteBanner)

//homepage Social Media Link routes
route.post('/add-media-link', addSocialMediaLink)
route.get('/get-media-links', getSocialMediaLinks)
route.get('/get-media-link/:id', getSocialMediaLinkById)
route.put('/edit-media-link/:id', editSocialMediaLink)
route.delete('/delete-media-link/:id', deleteSocialMediaLink)

//homepage Footer routes
route.post('/add-footer', addFooter)
route.get('/get-footer', getFooter)
route.get('/get-footer/:id', getFooterById)
route.put('/edit-footer/:id', editFooter)
route.delete('/delete-footer/:id', deleteFooter)

//page content routes
route.post('/add-page-content', addPageContent)
route.get('/get-page-contents', getPageContent)
route.put('/edit-page-content/:id', editPageContent)
route.delete('/delete-page-content/:id', deletePageContent)

//faces routes
route.post('/add-face', addFace)
route.get('/get-faces', getFaces)
route.get('/get-face/:id', getFaceById)
route.put('/edit-face/:id', editFace)
route.delete('/delete-face/:id', deleteFace)

//contact us routes
route.post('/add-contact', addContact)
route.get('/get-contact', getContact)
route.put('/edit-contact/:id', editContact)
route.delete('/delete-contact/:id', deleteContact)
route.post('/send-email-21tv', sendEmailTo21TV)


module.exports = route