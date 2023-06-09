const mongoose = require( "mongoose");
const {User, Blog, Comment} = require('../model')
const {validatedBlogSchema} = require('../utils')

/** post a new blog */
const createBlog = async (req, res) => {
  try {
    //validate the provided data
    const validation = validatedBlogSchema(req.body);
    if (validation.error) {
      res.status(422).send(validation.error.details[0].message);
      return;
    }
    //fetch the user making the blog post creation request
    const user = await User.findById(req.body.postedBy);
    if (!user) {
      res.status(404).json({ message: "unknown user" });
      return;
    }
    //create a new blog
    const blog = await Blog.create({ ...req.body });        
    user.blogs.push(blog._id); //adding the new blog id to the user's blogs list
    user.save();

    res.status(200).json({ message: "blog created successfully", blog });
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**Get all or some blogs controller */
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
const findBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("postedBy", { _id: 0, name: 1, email: 1 })
      .exec(); //only the name and email of the author should be displayed
    if (!blog) {
      return res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json({ blog });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/**Get blogs of a particular u */
const getUserBlogs = async (req, res) => {
  try {
    const { limit } = req.query;
    const user = await User.findById(req.params.userId)
      .populate({ path: "blogs", select: "title", limit: limit * 1 }) //to ensure an integer is used as limit
      .exec();
    if (!user) {
      res.status(404).json({ message: "no user found" });
      return;
    }
    res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**Get a blog with the given id */
const updateBlog = async (req, res) => {
    try {
      const blog = await Blog.findByIdAndUpdate(req.params.id,
        {body: req.body.body}
        )
        .populate("postedBy", { _id: 0, name: 1, email: 1 })
        .exec(); //only the name and email of the author should be displayed
      if (!blog) {
        return res.status(404).json({ message: "Not Found" });
      }
      res.status(200).json({ blog });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

/**Delete a blog post */
const deleteBlog = async (req, res) => {
    try {
      const blog = await Blog.findByIdAndDelete(req.params.id)
      if (!blog) {
        return res.status(404).json({ message: "Not Found" });
      }
      const userId = blog.postedBy
      const blogId = blog._id;
      //remove the blog from the user blog list
      await User.findByIdAndUpdate(userId, {
        $pull: { blogs: { $in: blogId } }
      });
      res.status(200).json({ blog });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

module.exports = {createBlog,getBlogs,findBlogById,getUserBlogs,deleteBlog}