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
  getForm
} = require("../src/controller").users;

/**Get signup form */
router.get('/signup',getForm)

/**create a new user */
router.post('/',createUser ) 

//search for user(s) with user email or name or pass the control to the next middleware
router.get('/', findAUser,findUsers)

// //middleware that will be executed if the user specifies no search query in the above route
// router.get('/', findUsers)

//route to find user by Id
router.get('/:id', findUserById)


router.put('/:id',updateUserInfo ) //edit user detail

router.delete('/:id', deleteUser)


module.exports = router
