const express = require( "express")
const mongoose = require( "mongoose");
const {User, Blog, Comment} = require('../../model')
const {doesNameOrEmailAlreadyExit} = require ('../../controller')
const router = express.Router()


router.post('/', (req, res)=>{
    const mainThread = async () =>{
        const userExist = await doesNameOrEmailAlreadyExit(User, req)
        if(userExist){
            res.status(userExist.status).json({message: userExist.message})
            return
        }
        //if the email and name are not existing in our User collection
        User.create({
            ...req.body
        })
            .then(user => {
                res.status(200).json({ message: 'user created successfully', user: user })
            })
            .catch(err => {
                res.status(404).json({ message: err.message })
            })
    }
    mainThread()
})

//search for user with user email or name 
router.get('/', (req, res, next) => {
    const value = (req.query.email)
        ? { email: req.query.email } : (req.query.name)
            ? { name: req.query.name } : false
            console.log({value})
            User.findOne(value)
            .then( user=>{
                res.status(200).json({ user })
            })  
            .catch (err => {
                res.status(404).json({ message: 'no user with the value found' }) 
            })
               
})

router.get('/', (req, res)=>{
    User.find({})
    .then(users => {
        res.status(200).json({message: "all users", users: users})
    })
    .catch(err =>{
        res.status(404).json({message: err.message})
    })
})

router.get('/:id', (req, res)=>{
    User.findById(req.params.id)
    .then(users => {
        res.status(200).json({message: "all users", users: users})
    })
    .catch(err =>{
        res.status(404).json({message: err.message})
    })
})


module.exports = router