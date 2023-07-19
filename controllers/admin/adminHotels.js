const {v4} = require('uuid')
const HotelsUZ = require('../../model/uz/HotelModel')
const HotelsENG = require('../../model/eng/HotelModel')
const HotelsRU = require('../../model/ru/HotelModel')

const addHotel= async(req,res) => {
    try{
        let HotelDBUZ = await HotelsUZ.find().lean()
        let HotelDBENG = await HotelsENG.find().lean()
        let HotelDBRU = await HotelsRU.find().lean()

        const id = v4()

        HotelDBUZ = {
            id,
            title: req.body.titleUZ,
            descr: req.body.descrUZ,
            img: '/upload/img/' + req.file.filename
        }
        HotelDBENG = {
            id,
            title: req.body.titleENG,
            descr: req.body.descrENG,
            img: '/upload/img/' + req.file.filename
        }
        HotelDBRU = {
            id,
            title: req.body.titleRU,
            descr: req.body.descrRU,
            img: '/upload/img/' + req.file.filename
        }

        await HotelsUZ.create(HotelDBUZ)
        await HotelsENG.create(HotelDBENG)
        await HotelsRU.create(HotelDBRU)

        return res.redirect('/admin/home')
    }
    catch(err){
        return res.redirect('/admin/home')
        console.log(err)
    }
}

const removeHotel= async(req,res) => {
    try{
        const id = req.params.id

        await HotelsUZ.find({id}).deleteOne()
        await HotelsENG.find({id}).deleteOne()
        await HotelsRU.find({id}).deleteOne()

        return res.redirect('/admin/home')
    }
    catch(err){
        return res.redirect('/admin/home')
        console.log(err)
    }
}

module.exports = {
    addHotel,
    removeHotel
}