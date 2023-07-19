const { v4 } = require('uuid')
const mongoose = require('mongoose')

const ServicesModelENG = new mongoose.Schema(
    [
        {
            id: {
                type: 'string',
                default: v4,
                required: true
            },
            title: {type: "string", required: true},
            img: {type: "string", required: true},
            cost:[ 
                {
                    content: {type: "string", required: true},
                    amount: {type: "string", required: true}
                }
            ],
            isLeft: {type: "boolean"},
        }
    ]
)

module.exports = mongoose.model('ServicesENG', ServicesModelENG)