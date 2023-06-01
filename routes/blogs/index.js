const express = require( "express")
const mongoose = require( "mongoose");
const {User, Blog, Comment} = require('../../src/model')
const {validatedBlogSchema} = require('../../src/utils')
const router = express.Router()


router.post('/', ) //create blog
 
// get all blog posts
 router.get('/',)
 

//get a particular blog post with the given id
 router.get('/:id', )

//get blogs of a particular user
 router.get('/:userId/blogs',)
 

 module.exports = router