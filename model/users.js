const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Users = new mongoose.Schema(
    {
        img: {
            type: "string", 
            default: '/assets/images/default-user.png'
        },
        fullName: {
            type: "string", 
            required: true, 
            trim:true
        },
        userName: {
            type: "string", 
            required: true, 
            trim:true, 
            unique: true
        },
        email: {
            type: "string", 
            required: true, 
            unique: true, 
            trim:true
        },
        phone: {
            type: "number", 
            required: true
        },
        password: {
            type: "string", 
            required: true
        },
        
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

module.exports = mongoose.model('Users', Users)
