
const userGuest = (req,res,next) => {
    if(req.session.status == 'user' && !req.session.isLogin){
        console.log(req.body.id)
        return res.redirect(`/eng/`)
    }
    next()
}

const paymentGuest = (req,res,next) => {
    if(req.session.status == 'user' && !req.session.isLogin){
        console.log(req.body.id)
        return res.redirect(`/eng/services/`)
    }
    next()
}

module.exports = {paymentGuest,userGuest}
