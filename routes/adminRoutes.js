const { Router } = require('express')
const upload = require('../utils/fileUploads.js')

const {
    getAdminPage,
    getHomePage,
    getAboutPage,
    getServicesPage,
    getContactPage,
    getOfferPage
} = require('../controllers/admin/adminControllers')

const {
    addServices,
    removeServices,
    updateServices
} = require('../controllers/admin/adminServices')

const {
    addHotel,
    removeHotel
} = require('../controllers/admin/adminHotels')

const {
    addPlace,
    removePlace
} = require('../controllers/admin/adminPlaces')

const {
    getAdminLoginPage,
    postLogin,
    logoutAdmin
} = require('../controllers/admin/adminLogin')

const {guest, protected} = require('../middlewares/adminLogin')

const router = Router()   

// "/" => "url + /admin"
router.get('/login', getAdminLoginPage)
router.post('/login', postLogin) 
router.post('/logout', logoutAdmin) 

router.get('/', protected, getAdminPage)
router.get('/home', protected, getHomePage)
router.post('/home/hotel/add', protected, upload.single('image'), addHotel)
router.post('/home/hotel/:id/remove', protected, removeHotel) 

router.post('/home/place/add', protected, upload.single('image'), addPlace) 
router.post('/home/place/:id/remove', protected, removePlace) 

router.get('/about', protected, getAboutPage)
router.get('/services', protected, getServicesPage)
router.post('/services/servis/add', protected,  upload.single('image'), addServices)
router.post('/services/:id/remove', protected, removeServices)
router.post('/services/:id/update', protected, upload.single('image'), updateServices)

router.get('/services/:id', protected, getOfferPage)
//admin/services/servis/add

router.get('/contact', protected, getContactPage)

router.get('/:id', (req, res) => {
    res.redirect('/admin/login')
})

module.exports = router


