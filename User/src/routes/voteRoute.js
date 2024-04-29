import express from 'express';
import { createVote, getContestantVotes, getUserVotes, getVotes } from '../controller/voteController.js';

const router = express.Router();

// Create a new vote
router.post('/create', createVote);

// Get all votes
router.get('/', getVotes);

router.get('/user', getUserVotes);

router.get('/contestant',getContestantVotes);

export default router;