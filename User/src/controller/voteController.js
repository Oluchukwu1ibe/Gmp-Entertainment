import Vote from '../models/Vote.js';
import User from '../models/User.js';
 import Contestant from '../models/contestant.js';


// Create a new vote
export const createVote = async (req, res) => {
    try {
      const { userId, contestantId, voteCount } = req.body;
  
      // Check if user exists
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
  
      // Check if contestant exists
      const contestant = await Contestant.findById(contestantId);
      if (!contestant) {
        throw new Error('Contestant not found');
      }
  
      // Create a new vote
      const vote = new Vote({ user: userId, contestant: contestantId, voteCount });
      await vote.save();
  
      // Update contestant points
      contestant.voteCount = (contestant.voteCount || 0) + voteCount;
      await contestant.save();

      user.isVoted = true;
      //save the document
      await user.save();
  
      res.status(201).json({ message: 'Vote created successfully', vote });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Get all votes
  export const getVotes = async (req, res) => {
    try {
      const votes = await Vote.find().populate('user').populate('contestant');
      res.status(200).json(votes);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Get votes by user
  export const getUserVotes = async (req, res) => {
    try {
      const userId = req.params.userId;
      const votes = await Vote.find({ user: userId }).populate('contestant');
      res.status(200).json(votes);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Get votes by contestant
  export const getContestantVotes = async (req, res) => {
    try {
      const contestantId = req.params.contestantId;
      const votes = await Vote.find({ contestant: contestantId }).populate('user');
      res.status(200).json(votes);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };