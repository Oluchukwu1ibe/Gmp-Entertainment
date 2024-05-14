import Vote from '../models/Vote.js';
import User from '../models/User.js';
 import Contestant from '../models/contestant.js';


// Create a new vote
export const createVote = async (req, res) => {
  try {
      // Obtain userId from user authentication (e.g., from session or token)
      const userId = req.user; // Assuming userId is stored in req.user after authentication
      // Check if user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // check if user.isVoted=true
      if (user.isVoted) {
        return res.status(400).json({ error: "User has already voted" });
        
      }

      // Obtain contestantId from request body (sent from frontend)
      const { contestantId } = req.body;


      // Check if contestant exists
      const contestant = await Contestant.findById(contestantId);
      if (!contestant) {
          return res.status(404).json({ error: "Contestant not found" });
      }

      // Create a new vote
      const vote = new Vote({ user: userId, contestant: contestantId });
      await vote.save();

      // Update contestant's vote count
      contestant.voteCount = (contestant.voteCount || 0) + 1;
      await contestant.save();
      // update user isVoted
      user.isVoted = true;
      await user.save();
      // Return success message
      res.status(201).json({ message: 'Vote created successfully', vote });
  } catch (error) {
    console.error("Error in creating vote:", error);
    res.status(500).json({ error: "Server Error" });

  }
};
  
  // Get all votes
  export const getVotes = async (req, res) => {
    try {
      const totalVotesCount = await Vote.countDocuments();
      const votes = await Vote.find().populate('user').populate('contestant').sort({ _id: -1 });
      res.status(200).json({ message: "Votes information", totalVotesCount, votes });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  
  
 