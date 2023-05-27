const express = require( "express")
const mongoose = require( "mongoose");
const {User, Blog, Comment} = require('../../model')
const {validatedBlogSchema} = require('../../controller')
const router = express.Router()


router.post('/', (req, res) => {
    const validation = validatedBlogSchema(req.body)
    if (validation.error) {
        res.status(422).send(validation.error.details[0].message);
        return;
    }
    User.findById(req.body.postedBy)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'unknown user' });
                return
            }
            Blog.create({ ...req.body }) //create a new blog 
                .then(blog => {
                    //adding the new blog id to the user's blogs list
                    user.blogs.push(blog._id)
                    user.save()
                    res.status(200).json({ message: 'blog created successfully', blog: blog })
                })
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})
 
// get all blog posts
 router.get('/', (req, res)=>{
    Blog.find().limit(2)
     .then(blogs => {
        if(blogs.length == 0){
            res.status(204).send();
            return;
        }
         res.status(200).json({message: "all blogs", blogs: blogs})
     })
     .catch(err =>{
         res.status(404).json({message: err.message})
     })
 })
 

//get a particular blog post with the given id
 router.get('/:id', (req, res)=>{
    Blog.findById(req.params.id)
    .populate("postedBy", 'name').exec() //only the name of the author should be displayed
     .then(posts => {
        if(!posts){
            return res.status(404).json({message: "Not Found"});
        }
         res.status(200).json({posts})
     })
     .catch(err =>{
         res.status(404).json({message: err.message})
     })
 })

 
 

 module.exports = router