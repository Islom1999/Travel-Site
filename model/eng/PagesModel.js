const mongoose = require('mongoose')

const PagesModelENG = new mongoose.Schema({
    navbar: {
        logoSrc: {type: 'string', required: true},
        links: {
            home: {type: 'string', required: true},
            about: {type: 'string', required: true},
            services: {type: 'string', required: true},
            contact: {type: 'string', required: true}
        },
        reg: {
            login: {type: 'string', required: true}
        }
    },
    footer: {
        content: {
            title: {type: 'string', required: true},
            descr: {type: 'string', required: true}
        },
        links: {
            title: {type: 'string', required: true},
            home: {type: 'string', required: true},
            about: {type: 'string', required: true},
            services: {type: 'string', required: true},
            contact: {type: 'string', required: true}
        },
        contact: {
            title: {type: 'string', required: true},
            location: {
                key: {type: 'string', required: true},
                value: {type: 'string', required: true},
            },
            phone: {
                key: {type: 'string', required: true},
                value: {type: 'string', required: true},
            },
            email: {
                key: {type: 'string', required: true},
                value: {type: 'string', required: true},
            },
        },
        network: {
            title: {type: 'string', required: true},
            facebook: {
                link: {type: 'string', required: true},
                content: {type: 'string', required: true},
            },
            instagram: {
                link: {type: 'string', required: true},
                content: {type: 'string', required: true},
            },
            telegram: {
                link: {type: 'string', required: true},
                content: {type: 'string', required: true},
            },
        },
        privacy: {
            leftOne:{type: 'string', required: true},
            leftTwo:{type: 'string', required: true},
            right:{type: 'string', required: true},
        }
    },
    homePage: {
        slider: [
            {
                img: {type: 'string', required: true },
                title: {type: 'string', required: true },
                descr: {type: 'string', required: true },
            }
        ], 
        section: {
            descr: {type: 'string', required: true },
            statis: [
                {
                    num: {type: 'number'},
                    content: {type: 'string'}
                }
            ],
            video: {
                src: {type: 'string', required: true},
                err: {type: 'string', required: true}
            },
            places: {
                title: {type: 'string', required: true},
                descr: {type: 'string', required: true}
            },
            hotels: {
                title: {type: 'string', required: true},
                descr: {type: 'string', required: true}
            },
            transport: {
                title: {type: 'string', required: true},
                descr: {type: 'string', required: true}
            }
        },
        btns: {
            load: {type: 'string', required: true},
            more: {type: 'string', required: true},
            learn: {type: 'string', required: true},
        }
    },
    servicesPage: {
        titleHome: {type: "string", required: true},
        titleSection: {type: "string", required: true},
        img: {type: "string", required: true},
        descr: {type: "string", required: true},
        cost: {type: "string", required: true},
        amount: {type: "string", required: true},
    },
    offer: {
        slider: [
            {img: { type: "string", required: true }}
        ]
    },
    about: {
        header: {
            img: {type: "string", required: true},
            title: {type: "string", required: true}
        },
        section: {
            descr: {type: "string", required: true},
            prising: [
                {
                    title: {type: 'string', required: true},
                    descr: {type: 'string', required: true}
                }
            ],
            discover: {
                img: {type: 'string', required: true},
                title: {type: 'string', required: true},
                descr: {type: 'string', required: true},
                elem: [
                    {text: {type: 'string', required: true}}
                ],
            }
        }
    },
    contact: {
        header: {
            img: {type: 'string', required: true},
            title: {type: 'string', required: true}
        },
        section: {
            inforTitle: {type: 'string', required: true},
            inforDescr: {type: 'string', required: true},
            phoneOne: {type: 'string', required: true},
            phoneTwo: {type: 'string', required: true},
            telegram: {type: 'string', required: true},
            email: {type: 'string', required: true},
            formTitle: {type: 'string', required: true},
            formDescr: {type: 'string', required: true},
            formTextValue: {type: 'string', required: true},
            formNameValue: {type: 'string', required: true},
            formEmailValue: {type: 'string', required: true},
            formBtn: {type: 'string', required: true},
        }
    }
    
})

module.exports = mongoose.model('PagesENG', PagesModelENG)