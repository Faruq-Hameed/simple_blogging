const mongoose = require( "mongoose");
const {User, Blog, Comment} = require('../model')
const {validatedCommentSchema} = require('../utils')


/** post a new comment */
const createComment = async (req, res) => {
    try {
      //validate the provided data
      const validation = validatedCommentSchema(req.body);
      if (validation.error) {
        res.status(422).send(validation.error.details[0].message);
        return;
      }
      const blogId =validation.value.blog
      const userId = validation.value.user

      //fetch the user making the comment creation request 
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ message: "unknown user" });
        return;
      }

       //create a new comment
      const comment = (await Comment.create({ ...req.body }))  
      //fetch the blog the user wants to comment on and add the commentId to the comment lists
    const blog = await Blog.findByIdAndUpdate(blogId, {$push: {comments: comment._id}})

    /////TO BE WORKED ON LATER
    // .limit(4) //only show the first 4 comments + the new comment the user just added
    // .populate(blog)
    // .populate(blog)
      res.status(200).json({ message: "comment created successfully", comment });
    } 
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  /**Get all or some comments for a blog controller */ //YET TO BE WORKED ON
  const getBlogs = async (req, res) => {
    try {
      const { limit } = req.query;
      const blogs = await Blog.find()
      .limit(limit * 1) //to ensure an integer is returned
      .populate('postedBy', {_id: 0, name: 1, email: 1})
      .exec()
      if( blogs.length < 0 ) {
          return res
          .status(200).json({message: "no blog available at this time"})
      }
      res.status(200).send(blogs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  /**Get a blog with the given id */
  const findCommentById = async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id)
        .populate("user", { _id: 0, name: 1, email: 1 })
        .populate("blog", 'title body')//only the body and title of the blog should be displayed
        .exec(); 
      if (!comment) {
        return res.status(404).json({ message: "Not Found" });
      }
      res.status(200).json({ comment }); //BLOG SHOULD BE RETURNED WITH THE COMMENT INSTEAD
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
  
  /**Get a COMMENT with the given id */
  const updateComment = async (req, res) => {
    try {
      const comment = await Comment.findByIdAndUpdate(
        req.params.id,
        { body: req.body.body },
        { returnDocument: "after" }
      )
        .populate("user", { _id: 0, name: 1, email: 1 })
        .populate("blog", "title body") //only the body and title of the blog should be displayed
        .exec();
      if (!comment) {
        return res.status(404).json({ message: "Not Found" });
      }
      res.status(200).json({ comment }); //BLOG SHOULD BE RETURNED WITH THE COMMENT INSTEAD
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
  
  /**Delete a comment post */
  const deleteComment = async (req, res) => {
      try {
        const comment = await Comment.findByIdAndDelete(req.params.id)
        if (!comment) {
          return res.status(404).json({ message: "Not Found" });
        }
        const commentId = comment.user
        const blogId = comment.blog;
        //remove the comment from the blog comment list
        await Blog.findByIdAndUpdate(blogId, {
          $pull: { blogs: { $in: commentId } }
        });
        res.status(200).json({ message: "comment deleted successfully" });
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
    };
  
  module.exports = {createComment,findCommentById,updateComment,deleteComment}