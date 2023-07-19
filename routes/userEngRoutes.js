const { Router } = require('express')

const {
    registerUser,
    loginUser,
    getUserPage,
    outUser,
    getUsers
} = require('../controllers/users/userEngControllers')

const {userGuest} = require('../middlewares/userLogin')

const router = Router()

router.get('/dashboard', userGuest, getUserPage)

router.post('/register', registerUser)
router.post('/login', loginUser)

router.post('/logout', outUser)

router.get('/getusers', getUsers) 

module.exports = router
