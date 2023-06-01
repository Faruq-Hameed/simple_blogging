const router = require( "express").Router()
const { createBlog, getBlogs, findBlogById, getUserBlogs } =
  require("../src/controller").blogControllers;

//create blog
router.post('/', createBlog) 
 
// get all blog posts
 router.get('/',getBlogs)
 

//get a particular blog post with the given id
 router.get('/:id', findBlogById)

//get blogs of a particular user
 router.get('/:userId/blogs',getUserBlogs)
 

 module.exports = router