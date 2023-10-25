const express = require( "express")
const mongoose = require( "mongoose");
const morgan = require('morgan');
const helmet = require('helmet');
// Require path modules
const path = require('path');
// Require pug template engine
const pug = require("pug");


require('dotenv').config({path: './.env'})
const {userRouters} = require ('./routes')
const {blogRouters} = require ('./routes')
const {commentRouters} = require ('./routes')

const app = express()
const port = process.env.PORT || 3000

//mongodb connection
mongoose.connect(process.env.MONGODB_URL + '/populate')
    .then(result => {
        console.log("connected to db Populate successfully")
    })
    .catch(err => { console.log(err.message) })

//necessary middlewares using global level middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Make a static route to use your
// static files in client side
app.use('/static', express.static('static'));

// Define and use pug engine so also
// declare path on rendering
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan(":method :url :status :res[content-length] - :response-time ms - :remote-user :date"))
app.use(helmet()) //security for response header

//router level middlewares usage
app.use('/users', userRouters )
app.use('/blogs', blogRouters )
app.use('/comments/', commentRouters )


//invalid url global middleware
app.use(function (req, res, next) {
    res.status(404).send("invalid url")
  });

app.listen(port, ()=>{
    console.log('listening in port: ', port)
})
