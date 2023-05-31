const mongoose = require( "mongoose");
const {User, Blog, Comment} = require('../model')
const {doesNameOrEmailAlreadyExit, paginate, paginationError} = require('../utils')

/**create a new user */
const createUser = async (req, res) => {
  try {
    const userExist = await doesNameOrEmailAlreadyExit(User, req);
    if (userExist) {
      res.status(userExist.status).json({ message: userExist.message });
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
const findUserById = async (req, res)=>{
    try{
 let {showBlogs} = req.query 
    const id = req.params.id
        if (!mongoose.isValidObjectId(id)) { //if the is passed is not a momgoose objectId type
          return res.status(422).json({ message: "invalid id format provided" });
        }
    User.findById(id)
    .populate('blogs', 'title comments')
    .exec() 
    .then(user => {
        if(!user) {
            res.status(404).json({message: 'no user found'})
            return;
        }
        if (!showBlogs) {
            const totalBlogs= user.blogs.length
            res.status(200).json({name: user.name, email: user.email, totalBlogs: totalBlogs})
            return
        }
        res.status(200).json({user})
    })
    }
    catch (err) {
        return res.status(500).json({message: err.message})

    }
   
    
}

/**update user information */
const updateUserInfo = async(req, res) => {
    const newUserInfo = { name: req.body.name, email: req.body.email }
    User.findByIdAndUpdate(req.params.id, { $set: newUserInfo })
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'no user found' })
            return;
        }
        res.status(200).json({message : "update successful"}) //needed to pass correct option so that updated information are returned
    })
    .catch(err =>{
        return res.status(500).json({message: err.message})
    })
}

/**Delete a user account*/
const deleteUser = async (req, res)=>{
    User.findByIdAndDelete(req.params.id)
    .then(user => {
        if(!user) {
            res.status(404).json({message: 'no user found'})
            return;
        }
        res.status(200).json({message: 'user account deleted successfully'})
    })
    .catch(err =>{
        return res.status(500).json({message: err.message})
    })
}

module.exports = userControllers = {createUser,findAUser,findUsers,findUserById,updateUserInfo,deleteUser}