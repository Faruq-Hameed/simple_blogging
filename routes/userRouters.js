const express = require( "express")
const userControllers = require('../src/controller')
const router = express.Router();
const {
  createUser,
  findAUser,
  findUsers,
  findUserById,
  updateUserInfo,
  deleteUser,
} = require("../src/controller").users;

/**create a new user */
router.post('/',createUser ) 

//search for user with user id, email or name 
router.get('/:id', findAUser)
//search for user with user id, email or name 

//middleware that will be executed if the user specifies no search query in the above route
router.get('/', findUsers)

//route to find user by Id
router.get('/:id', findUserById)


router.put('/:id',updateUserInfo ) //edit user detail

router.delete('/:id', deleteUser)


module.exports = router
