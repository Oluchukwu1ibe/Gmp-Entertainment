import express from "express";
import { authenticateUserToken } from "../middleware/checkAuth.js";
import { createComment,getAllComment,getCommentById,replyToComment,likeComment,dislikeComment } from "../controller/commentCont.js";

const router =express.Router();

router.post('/',authenticateUserToken,createComment);
router.get('/:id',getCommentById);
router.get('/',getAllComment);
router.post('/reply',authenticateUserToken, replyToComment);
router.post('/:commentId/like',authenticateUserToken, likeComment);
router.post('/:commentId/dislike',authenticateUserToken, dislikeComment);

export default router;