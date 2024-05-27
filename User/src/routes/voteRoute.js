import express from 'express';
import { createVote,getVotes } from '../controller/voteController.js';
import { authenticateUserToken } from '../middleware/checkAuth.js';

const router = express.Router();

// Create a new vote
router.post('/vote',authenticateUserToken,createVote);

// Get all votes
router.get('/', getVotes);

export default router;