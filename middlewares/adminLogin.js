 
const protected = (req,res,next) => {
    if(!(req.session.isAdmin && req.session.isLogin)){
        return res.redirect("/admin/login")
    }
    next()
}

const guest = (req,res,next) => {
    if(req.session.isAdmin && req.session.isLogin){
        return res.redirect("admin/home")
    }
    next()
}

module.exports = {protected, guest}