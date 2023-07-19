const { Router } = require('express')

const {paymentGuest} = require('../middlewares/userLogin')
const {
    createOrder
} = require('../controllers/paymentControllers.js')

const router = Router()

router.post('/order/create',paymentGuest, createOrder)

module.exports = router
