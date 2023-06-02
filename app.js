const express = require( "express")
const mongoose = require( "mongoose");
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config({path: './.env'})
const {userRouters} = require ('./routes')
const {blogRouters} = require ('./routes')

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
app.use(morgan(":method :url :status :res[content-length] - :response-time ms - :remote-user :date"))
app.use(helmet())

//router level middlewares usage
app.use('/users', userRouters )
app.use('/blogs', blogRouters )




//invalid url global middleware
app.use(function (req, res, next) {
    res.status(404).send("invalid url")
  });


app.listen(port, ()=>{
    console.log('listening in port: ', port)
})