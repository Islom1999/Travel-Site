const mongoose = require('mongoose')

const UserPageDB = new mongoose.Schema(
    [
        {
            uz: {
                title: {type: "string", required: true},
                header: {
                    textOne: {type: "string", required: true},
                    textTwo: {type: "string", required: true}
                },
                pages:{
                    profile: {type: "string", required: true},
                    profileUpdate: {type: "string", required: true},
                    profileServices: {type: "string", required: true},
                    profileLogOut: {type: "string", required: true},
                },
                dash: {
                    fullname: {type: "string", required: true},
                    userName: {type: "string", required: true},
                    email: {type: "string", required: true},
                    phone: {type: "string", required: true},
                    descr: {type: "string"},
                }
            },
            eng: {
                title: {type: "string", required: true},
                header: {
                    textOne: {type: "string", required: true},
                    textTwo: {type: "string", required: true}
                },
                pages:{
                    profile: {type: "string", required: true},
                    profileUpdate: {type: "string", required: true},
                    profileServices: {type: "string", required: true},
                    profileLogOut: {type: "string", required: true},
                },
                dash: {
                    fullname: {type: "string", required: true},
                    userName: {type: "string", required: true},
                    email: {type: "string", required: true},
                    phone: {type: "string", required: true},
                    descr: {type: "string"},
                }
            },
            ru: {
                title: {type: "string", required: true},
                header: {
                    textOne: {type: "string", required: true},
                    textTwo: {type: "string", required: true}
                },
                pages:{
                    profile: {type: "string", required: true},
                    profileUpdate: {type: "string", required: true},
                    profileServices: {type: "string", required: true},
                    profileLogOut: {type: "string", required: true},
                },
                dash: {
                    fullname: {type: "string", required: true},
                    userName: {type: "string", required: true},
                    email: {type: "string", required: true},
                    phone: {type: "string", required: true},
                    descr: {type: "string"},
                }
            }
        }
    ]
)

module.exports = mongoose.model('UserPageDB', UserPageDB)