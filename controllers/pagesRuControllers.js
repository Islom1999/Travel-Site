// RU DATA MODELS REQUIRE
const Pages = require('../model/ru/PagesModel')
const Place = require('../model/ru/PlaceModel')
const Hotel = require('../model/ru/HotelModel')
const Transport = require('../model/ru/TransportModel')
const Services = require('../model/ru/ServicesModel')


const getHomePage = async(req,res) => {
    try{
        const PagesDB = await Pages.find().lean()
        const PlaceDB = await Place.find().lean()
        const HotelDB = await Hotel.find().lean()
        const TransportDB = await Transport.find().lean()
        const ServicesDB = await Services.find().lean()

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

        res.render('home', {
            url: process.env.URL + '/ru',
            Navbar: PagesDB[0].navbar,
            Footer: PagesDB[0].footer,
            langRU: 'ru',
            lang: 'ru',
            HomeDB: PagesDB[0].homePage,

            PlaceDefaultDB: PlaceDB.slice(0, 4),
            PlaceLoadDB: PlaceDB.slice(4, PlaceDB.length),

            HotelDefaultDB: HotelDB.slice(0, 4),
            HotelLoadDB: HotelDB.slice(4, HotelDB.length),

            TransportDefaultDB: TransportDB.slice(0, 4),
            TransportLoadDB: TransportDB.slice(4, TransportDB.length),

            ServicesPage: PagesDB[0].servicesPage,

            ServicesLeftDB: ServicesDB[0],
            AmountLeft,
            ServicesRightDB: ServicesDB[1],
            AmountRight
        })
    }catch(err){
        console.log(err)
    }
}
const getAboutPage = async(req,res) => {
    try{
        const PagesDB = await Pages.find().lean()
        res.render('about', {
            url: process.env.URL + '/ru',
            Navbar: PagesDB[0].navbar,
            Footer: PagesDB[0].footer,
            langRU: 'ru',
            lang: 'ru',
            AboutDB: PagesDB[0].about,
            statisDB: PagesDB[0].homePage.section.statis,
            videoDB: PagesDB[0].homePage.section.video
        })
    }catch(err){
        console.log(err)
    }
}
const getContactPage = async(req,res) => {
    try{
        const PagesDB = await Pages.find().lean()
        res.render('contact', {
            url: process.env.URL + '/ru',
            Navbar: PagesDB[0].navbar,
            Footer: PagesDB[0].footer,
            langRU: 'ru',
            lang: 'ru',
            PagesDB: PagesDB[0].contact
        })
    }catch(err){
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

        res.render('services', {
            url: process.env.URL + '/ru',
            Navbar: PagesDB[0].navbar,
            Footer: PagesDB[0].footer,
            langRU: 'ru',
            lang: 'ru',
            ServicesPage: PagesDB[0].servicesPage,
            ServicesDB
        })
    }catch(err){
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

        res.render('offer', {
            url: process.env.URL + '/ru',
            Navbar: PagesDB[0].navbar,
            Footer: PagesDB[0].footer,
            langRU: 'ru',
            lang: 'ru',
            ServicesDB: ServicesDB[0],
            slider: PagesDB[0].offer.slider
        })
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    getHomePage,
    getAboutPage,
    getContactPage,
    getServicesPage,
    getOfferPage
}