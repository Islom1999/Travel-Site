const {v4} = require('uuid')
const PlacesUZ = require('../../model/uz/PlaceModel')
const PlacesENG = require('../../model/eng/PlaceModel')
const PlacesRU = require('../../model/ru/PlaceModel')

const addPlace= async(req,res) => {
    try{
        let PlaceDBUZ = await PlacesUZ.find().lean()
        let PlaceDBENG = await PlacesENG.find().lean()
        let PlaceDBRU = await PlacesRU.find().lean()

        const id = v4()

        PlaceDBUZ = {
            id,
            title: req.body.titleUZ,
            descr: req.body.descrUZ,
            img: '/upload/img/' + req.file.filename
        }
        PlaceDBENG = {
            id,
            title: req.body.titleENG,
            descr: req.body.descrENG,
            img: '/upload/img/' + req.file.filename
        }
        PlaceDBRU = {
            id,
            title: req.body.titleRU,
            descr: req.body.descrRU,
            img: '/upload/img/' + req.file.filename
        }

        await PlacesUZ.create(PlaceDBUZ)
        await PlacesENG.create(PlaceDBENG)
        await PlacesRU.create(PlaceDBRU)

        return res.redirect('/admin/home')
    }
    catch(err){
        return res.redirect('/admin/home')
        console.log(err)
    }
}

const removePlace= async(req,res) => {
    try{
        const id = req.params.id

        await PlacesUZ.find({id}).deleteOne()
        await PlacesENG.find({id}).deleteOne()
        await PlacesRU.find({id}).deleteOne()

        return res.redirect('/admin/home')
    }
    catch(err){
        return res.redirect('/admin/home')
        console.log(err)
    }
}

module.exports = {
    addPlace,
    removePlace
}