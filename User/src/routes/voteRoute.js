const express = require('express');
const { createVote, getVotes } = require('../controller/voteController');
const { authenticateUserToken } = require('../middleware/checkAuth');

const router = express.Router();

// Create a new vote
router.post('/vote', authenticateUserToken, createVote);

// Get all votes
router.get('/', getVotes);

module.exports = router;
