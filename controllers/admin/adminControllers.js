const Pages = require('../../model/uz/PagesModel')
const Place = require('../../model/uz/PlaceModel')
const Hotel = require('../../model/uz/HotelModel')
const Services = require('../../model/uz/ServicesModel')

// RU
const PagesRU = require('../../model/ru/PagesModel')
const PagesENG = require('../../model/eng/PagesModel')

const getAdminPage = async(req,res) => { 
    try{
        return res.render('admin/dash', {
            admin: 'admin',
            urlAdmin: process.env.URL,
            url: process.env.URL + 'uz',
            pageDash: 'dash'
        })
    }
    catch(err){
        console.log(err)
    }
}

const getHomePage = async(req,res) => {
    //UZ
    const PagesDB = await Pages.find().lean()
    //ENG
    const PageENG = await PagesENG.find().lean()
    //RU
    const PageRU = await PagesRU.find().lean()

    const PlaceDB = await Place.find().lean()
    const HotelDB = await Hotel.find().lean()
    const ServicesDB = await Services.find().lean()
    
    const PagesUpdate = {
        slider: {
            uz: PagesDB[0].homePage.slider,
            eng: PageENG[0].homePage.slider,
            ru: PageRU[0].homePage.slider
        }
    }

    let AmountLeft = 0
    if(Boolean(ServicesDB[0])){
        ServicesDB[0].cost.forEach(elem => {
            AmountLeft += parseFloat(elem.amount)
        })
    }
    let AmountRight = 0
    if(Boolean(ServicesDB[1])){
        ServicesDB[1].cost.forEach(elem => {
            AmountRight += parseFloat(elem.amount)
        })
    }

    try{
        return res.render('admin/adminHome', {
            admin: 'admin',
            urlAdmin: process.env.URL,
            url: process.env.URL + 'uz',
            pageHome: 'home',

            HomeDB: PagesDB[0].homePage,

            PlaceDefaultDB: PlaceDB.slice(0, 4),
            PlaceLoadDB: PlaceDB.slice(4, PlaceDB.length),

            HotelDefaultDB: HotelDB.slice(0, 4),
            HotelLoadDB: HotelDB.slice(4, HotelDB.length),

            ServicesPage: PagesDB[0].servicesPage,

            ServicesLeftDB: ServicesDB[0],
            AmountLeft,
            ServicesRightDB: ServicesDB[1],
            AmountRight,

            PagesUpdate
        })
    }
    catch(err){
        console.log(err)
    }
}

const getAboutPage = async(req,res) => {
    const PagesDB = await Pages.find().lean()
    try{
        return res.render('admin/adminAbout', {
            admin: 'admin',
            urlAdmin: process.env.URL,
            url: process.env.URL + 'uz',
            pageAbout: 'about',

            AboutDB: PagesDB[0].about,
            statisDB: PagesDB[0].homePage.section.statis,
            videoDB: PagesDB[0].homePage.section.video
        })
    }
    catch(err){
        console.log(err)
    }
}

const getServicesPage = async(req,res) => {
    try{
        const PagesDB = await Pages.find().lean()
        const ServicesDB = await Services.find().lean()

        ServicesDB.forEach(elem => {
            let amount = 0
            elem.cost.forEach(cost => {
                amount += parseFloat(cost.amount)
            })
            elem.allAmount = amount
            elem.btn = PagesDB[0].homePage.btns.learn
            elem.content = {
                cost: PagesDB[0].servicesPage.cost, 
                amount: PagesDB[0].servicesPage.amount,
            }
        })
 
        return res.render('admin/adminServices', {
            admin: 'admin',
            urlAdmin: process.env.URL,
            url: process.env.URL + 'uz',
            pageServices: 'services',

            ServicesPage: PagesDB[0].servicesPage,
            ServicesDB
        })
    }
    catch(err){
        console.log(err)
    }
}

const getContactPage = async(req,res) => {
    try{
        const PagesDB = await Pages.find().lean()
        
        return res.render('admin/adminContact', {
            admin: 'admin',
            urlAdmin: process.env.URL,
            url: process.env.URL + 'uz',
            pageContact: 'contact',

            Footer: PagesDB[0].footer,
            PagesDB: PagesDB[0].contact
        })
    }
    catch(err){
        console.log(err)
    }
}

const getOfferPage = async(req,res) => {
    try{
        const PagesDB = await Pages.find().lean()
        const ServicesDB = await Services.find({id: req.params.id}).lean()

        let amount = 0
        ServicesDB[0].cost.forEach(elem => {
            amount += parseFloat(elem.amount)
        })

        ServicesDB[0].allAmount = amount

        ServicesDB[0].btn = PagesDB[0].homePage.btns.learn

        ServicesDB[0].content = {
            cost: PagesDB[0].servicesPage.cost,
            amount: PagesDB[0].servicesPage.amount
        }

        return res.render('admin/adminOffer', {
            admin: 'admin',
            urlAdmin: process.env.URL,
            url: process.env.URL + 'uz',
            pageContact: 'offer',

            ServicesDB: ServicesDB[0],
            slider: PagesDB[0].offer.slider
        })
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {
    getAdminPage,
    getHomePage,
    getAboutPage,
    getServicesPage,
    getContactPage,
    getOfferPage
}