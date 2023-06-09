const mongoose = require( "mongoose");
const {User, Blog, Comment} = require('../model')
const {doesNameOrEmailAlreadyExit, paginate, paginationError} = require('../utils')


// Handling get request
const getForm = (req, res) => {
  // Rendering your form
  res.render("signUp_form");
};

// Handling data after submission of form
const submitFeedBack = async (req, res) => {
  try {
    const feedData = new feedModel({
      name: req.body.name,
      email: req.body.email,
    });
    feedData.save().then((data) => {
      res.render("signUp_form", { msg: "Your signUp successfully saved." });
    });
  } catch (err) {
    res.render("signUp_form", { msg: "Check Details." });
  } 
};

/**create a new user */
const createUser = async (req, res) => {
  try {
    const existingUser = await doesNameOrEmailAlreadyExit(User, req);
    if (existingUser) {
      res.status(existingUser.status).json({ message: existingUser.message });
      return;
    }
    //if the email and name are not existing in our User collection
    const user = await User.create({
      ...req.body,
    });
    res.status(200).json({ message: "user created successfully", user });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/** search for a user with the user email or name */
const findAUser = async (req, res, next) => {
  try {
    const { email, name, limit } = req.query; //extract
    if (!email || !name && limit) {
      next(); //i.e if the user specifies no search query
      return;
    }
    let searchKey = email ? { email } : name ? { name } : false;
    if (!searchKey) {
      res.status(404).json({ message: "bad search query" }); // if provide query is not recognized
      return;
    }
    const user = await User.findOne(searchKey);     
    if (!user) { //incase null was returned i.e unknown email or name was provided
      res
        .status(404)
        .json({
          message: `no user with info ${
            searchKey.email || searchKey.name
          } found`,
        });
      return;
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**middleware that will be executed if the user specifies no search query*/
const findUsers = async (req, res) => {
  try {
    const { limit } = req.query;
    User.find({})
      .limit(limit * 1) //to ensure that an integer is returned
      // .populate('blogs', 'title comments')
      // .exec()
      .then((users) => {
        if (users.length <= 0) {
          res.status(200).json({ message: "No users found at the moment" });
          return;
        }
        res.status(200).json({ users });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**Get a user by id */
const findUserById = async (req, res) => {
  try {
    let { showBlogs } = req.query;
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      //if the is passed is not a mongoose objectId type
      return res.status(422).json({ message: "invalid id format provided" });
    }
    User.findById(id)
      .populate("blogs", "title comments")
      .exec()
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "no user found" });
          return;
        }
        if (!showBlogs) {
          const totalBlogs = user.blogs.length;
          res
            .status(200)
            .json({
              name: user.name,
              email: user.email,
              totalBlogs: totalBlogs,
            });
          return;
        }
        res.status(200).json({ user });
      });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**update user information */
const updateUserInfo = async (req, res) => {
  try {
    const newUserInfo = ({ name, email } = req.body);
    const { id } = req.params;
    const existingUser = await doesNameOrEmailAlreadyExit(User, req);
    if (
      existingUser &&
      existingUser.user._id.toString() !== id //converted the objectId to string
    ) {
      res.status(existingUser.status).json({ message: existingUser.message });
      return;
    }
    const user = await User.findByIdAndUpdate(
      id,
      { $set: newUserInfo },
      { returnDocument: "after" }
    );
    if (!user) {
      res.status(404).json({ message: "no user found" });
      return;
    }
    res.status(200).json({ message: "update successful", user }); //needed to pass correct option so that updated information are returned
  } 
  catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**Delete a user account*/
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: "no user found" });
      return;
    }
    // delete the user's blog posts and comments
    await Blog.deleteMany({ postedBy: user._id });
    await Comment.deleteMany({ user: user._id});
    res.status(200).json({ message: "user account and posts deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = userControllers = {createUser,findAUser,findUsers,findUserById,updateUserInfo,deleteUser,getForm}