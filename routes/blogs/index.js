const express = require( "express")
const mongoose = require( "mongoose");
const {User, Blog, Comment} = require('../../model')
const router = express.Router()


app.post('/post/:userId', (req, res)=>{

    Post.create({
         title: "life a programmer",
         post: "being a programmer is sweet  but you will see shhegees",
         postedBy: req.params.userId 
     })
     .then(post =>{
         res.status(200).json({message: 'post created successfully', post: post})
     })
     .catch (err =>{
         res.status(404).json({message: err.message})
     })  
 })
 
 app.get('/posts', (req, res)=>{
     Post.find()
     .then(posts => {
         res.status(200).json({message: "all posts", posts: posts})
     })
     .catch(err =>{
         res.status(404).json({message: err.message})
     })
 })
 
 app.get('/post', (req, res)=>{
     Post.findById("64130e4ab4fd3988dc353c20").populate("postedBy")
     .then(posts => {
         res.status(200).json({message: "all posts", posts: posts})
     })
     .catch(err =>{
         res.status(404).json({message: err.message})
     })
 })