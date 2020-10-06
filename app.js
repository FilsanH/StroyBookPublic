const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const connect = require('mongoose')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

//Load config
dotenv.config({ path: './config/config.env' }) // put all of our global variables

// Passport config
require('./config/passport')(passport)
// connect to DB
connectDB()

const app = express()

//logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')) //https request looger middleware
}

// Handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')
// layouts works by inputing 'views' files into the body of layout

//Session middleware must go above passport middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false, //don't create a session untill its called
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// define folder as Static folder so files can be access from the client
app.use(express.static(path.join(__dirname, '/public')))

//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000 //.env access defined variables

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
