const mongoose = require('mongoose')
const { v4 } = require('uuid')

const HotelModelRU = new mongoose.Schema(
    {
        id: {
            type: 'string',
            default: v4,
            required: true
        },
        img: {type: "string", required: true},
        title: {type: "string", required: true},
        descr: {type: "string", required: true},
        
        updated_at: {
            type: Date,
            default: Date.now()
        },
        created_at: {
            type: Date,
            default: Date.now()
        }
    }
)

module.exports = mongoose.model('HotelRU', HotelModelRU)