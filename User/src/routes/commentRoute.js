const express = require("express");
const { authenticateUserToken } = require("../middleware/checkAuth");
const { 
  createComment,
  getAllComment,
  getCommentById,
  replyToComment,
  likeComment,
  dislikeComment 
} = require("../controller/commentCont");

const router = express.Router();

router.post('/', authenticateUserToken, createComment);
router.get('/:id', getCommentById);
router.get('/', getAllComment);
router.post('/reply', authenticateUserToken, replyToComment);
router.post('/:commentId/like', authenticateUserToken, likeComment);
router.post('/:commentId/dislike', authenticateUserToken, dislikeComment);

module.exports = router;
