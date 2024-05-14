import express from 'express';
import { createVote,getVotes } from '../controller/voteController.js';
import authenticateToken from '../middleware/checkAuth.js';

const router = express.Router();

// Create a new vote
router.post('/vote',authenticateToken,createVote);

// Get all votes
router.get('/', getVotes);

export default router;