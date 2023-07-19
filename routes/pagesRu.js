const {Router} = require('express')
const { 
    getHomePage,
    getAboutPage,
    getContactPage,
    getServicesPage,
    getOfferPage
} = require('../controllers/pagesRuControllers')

const router = Router()

router.get('/', getHomePage)
router.get('/about', getAboutPage)

router.get('/services', getServicesPage)
router.get('/services/:id', getOfferPage)

router.get('/contact', getContactPage)

router.get('/:id', (req, res) => {
    res.redirect('/ru/')
})

module.exports = router