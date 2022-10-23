if(process.env.NODE_ENV !== 'production'){
    require ('dotenv').config()
}

const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const ExpressError = require('./utils/ExpressError')
const storeRouter = require('./routes/storeRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const userRouter = require('./routes/userRoutes')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')


//connect mongoose to server
mongoose.connect('mongodb://localhost:27017/yelp-camp', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log('Database connected')
})

//method override
app.use(methodOverride('_method') )

//set view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


//To parse request body
app.use(express.urlencoded({extended: true}))
//static file
app.use(express.static(path.join(__dirname, 'public')))

// Morgan logger
app.use(morgan('tiny'))
app.engine('ejs', ejsMate)

//use express session
const sessionConfig ={
    secret: 'thanh123',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge:1000 * 60 * 60 * 24 * 7
    }
    
}
app.use(session(sessionConfig))

//passport
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//flash
app.use(flash())
app.use((req,res,next) => {
    if(!['/users/login', '/stores'].includes(req.originalUrl)){
        req.session.returnTo = req.originalUrl
    }
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})



//routes
app.use('/stores/:id/reviews', reviewRouter)
app.use('/stores', storeRouter)
app.use('/users', userRouter)




app.all('*', (req,res, next) => {
    next(new ExpressError('Page not found', 404))
})

app.use((err, req ,res, next) => {
    const { statusCode = 500} = err;
    if(!err.message) err.message = "Something went wrong"
    res.status(statusCode).render('error', { err })
})


app.listen(3000, () => {
    console.log('Listening on port 3000')
})