const express = require('express')
const {engine} = require('express-handlebars')
const path = require('path')
const env = require('dotenv')
const connectDB = require('./config/configDb')

const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const cors = require('cors')

// const flash = require('connect-flash')
const helmet = require("helmet")
const compression = require('compression')

const app = express()

env.config()

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cors())

// initilize to daabase

const store = new MongoStore({
    collection: 'sessions',
    uri: process.env.MONGO_URI
})

app.use(session({
    secret: process.env.SECTION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}))
// app.use(flash()) 
// app.use(helmet())
app.use(compression())

app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.redirect('/eng/')
})

app.use('/eng/user', require('./routes/userEngRoutes'))
app.use('/uz/user', require('./routes/userUzRoutes'))
app.use('/ru/user', require('./routes/userRuRoutes'))

app.use('/uz', require('./routes/pagesUz'))
app.use('/eng', require('./routes/pagesEng'))
app.use('/ru', require('./routes/pagesRu'))

app.use('/payment', require('./routes/paymentRoute'))
app.use('/admin', require('./routes/adminRoutes'))
app.use('/merchant', require('./paysys/payme/merchant'))
app.get('/:id', (req, res) => {
    res.redirect('/eng/')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(PORT)
})