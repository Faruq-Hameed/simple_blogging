const router = require( "express").Router()
const { createBlog, getBlogs, findBlogById, getUserBlogs,deleteBlog } =
  require("../src/controller").blogControllers;

//create blog
router.post('/', createBlog) 
 
// get all blog posts
 router.get('/',getBlogs)
 
//get a particular blog post with the given id
 router.get('/:id', findBlogById)

//delete a particular blog post with the given id
router.delete('/:id', deleteBlog)

//get blogs of a particular user
 router.get('/:userId/blogs',getUserBlogs)
 

 module.exports = router