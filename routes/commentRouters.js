const router = require( "express").Router()
const {createComment,findCommentById,updateComment,deleteComment} =
  require("../src/controller").commentControllers;

//create Comment
router.post('/', createComment) 
 
//get a particular Comment post with the given id
 router.get('/:id', findCommentById)

 //update a comment
router.put('/:id', updateComment)

//delete a particular Comment post with the given id
router.delete('/:id', deleteComment)

//get Comments of a particular user
//  router.get('/:userId/Comments',getUserComments)
 

 module.exports = router