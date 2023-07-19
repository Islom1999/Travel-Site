const Users = require('../../model/users')
const UsersPage = require('../../model/UserPage')
const Pages = require('../../model/eng/PagesModel')

const registerUser = async(req,res) => {
    try{
        const { fullName, userName, email, phone, pass, passRepeat} = req.body

        if(pass == passRepeat){
            await Users.create({ 
                fullName,
                userName,
                email,
                phone: parseInt(phone),
                password: pass,
            })

            req.session.user = userName
            req.session.isLogin = true
            req.session.isAdmin = false
            req.session.status = 'user'
            req.session.save()

            return res.status(201).json({
                message: 'OK',
                url: `/eng/user/dashboard`
            })
        }else{
            // if(pass !== passRepeat){
            //     req.flash('PassErr', "siz kiritgan parollar bir xil emas")
            // }
            return res.redirect('/uz/home')
        }
    }catch(err){
        console.log(err)
        redirect('/uz/home')
    }
}

const loginUser = async(req,res) => {
    try{
        const { userName, pass} = req.body

        const UsersDB = await Users.find({userName}).lean()

        if((UsersDB[0].password == pass)&&(UsersDB[0].userName == userName)){
            req.session.user = userName
            req.session.isLogin = true
            req.session.isAdmin = false
            req.session.status = 'user'
            req.session.save()
            
            return res.redirect('/eng/user/dashboard')
        }else{
            console.log('salom')
            return res.redirect('/eng/')
        }
    }catch(err){
        console.log(err)
        return res.redirect('/eng/')
    }
}

const getUserPage = async(req,res) => {
    try{
        const PagesDB = await Pages.find().lean()
        const UsersPageDB = await UsersPage.find().lean()
        const UsersDB = await Users.find({userName: req.session.user }).lean()

        console.log(UsersDB[0])

        if(req.session.isLogin && (req.session.status == 'user')){
            return res.render('userDashboard/profile',{
                url: process.env.URL + '/eng',
                Navbar: PagesDB[0].navbar,
                Footer: PagesDB[0].footer,
                langENG: 'eng',
                lang: 'eng',   
                UsersDB: UsersDB[0],
                UsersPageDB: UsersPageDB[0].eng,
            })
        }else{
            return res.redirect('/eng/')
        }
    }catch(err){
        console.log(err)
    }
}

const outUser = async(req,res) => {
    req.session.isLogin = false
    req.session.isAdmin = false
    req.session.status = 'user'
    req.session.save()

    return res.redirect('/eng/')
}

const getUsers = async(req, res) => {
    const UsersDB = await Users.find().lean()

    let users  = []

    UsersDB.forEach(elem => {
        users.push({
            userName: elem.userName,
            email: elem.email,
        })
    })

    // res.set('Access-Control-Allow-Origin', 'true')

    res.status(200).json({
        message: 'OK',
        data: users
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUserPage,
    outUser,
    getUsers
}