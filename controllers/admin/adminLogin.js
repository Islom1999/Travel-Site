const bcrypt = require('bcryptjs')

const getAdminLoginPage = async(req,res) => {
    return res.render('admin/adminLogin', {
        adminLogin: 'adminLogin'
    })
}

const postLogin = async(req,res) => {

    const user = req.body.adminUser
    const pass = req.body.adminPassword
    const ADMIN_PASS = process.env.ADMIN_PASS

    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(pass, salt);

    // const isPass = bcrypt.compareSync(pass, ADMIN_PASS)
    const isUser = user === process.env.ADMIN_LOGIN

    if(pass && isUser){
        req.session.user = user
        req.session.isLogin = true
        req.session.isAdmin = true
        req.session.status = 'admin'
        req.session.save()

        return res.redirect('/admin/home')
    }else{
        return res.redirect('/admin/login')
    }
} 

const logoutAdmin = async(req, res) => {
    req.session.isLogin = false
    req.session.save()

    return res.redirect('/admin/login')
}

module.exports = {
    getAdminLoginPage,
    postLogin,
    logoutAdmin
}