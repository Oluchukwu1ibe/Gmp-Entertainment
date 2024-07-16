import express from "express";
import { authenticateUserToken } from "../middleware/checkAuth.js";
import { createComment,getAllComment,getCommentById } from "../controller/commentCont.js";

const router =express.Router();

router.post('/',authenticateUserToken,createComment);
router.get('/:id',getCommentById);
router.get('/',getAllComment);

export default router;