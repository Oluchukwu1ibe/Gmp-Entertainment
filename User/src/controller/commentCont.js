const User = require("../models/User.js");
const Comment = require("../models/comment.js");
const logger = require("../utils/log/log.js");


exports. createComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }
    const userId = req.user;

    // Check if the userId exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const newComment = await Comment.create({
      text,
      user: userId,
      likes: [],
      dislikes: [],
    });

    res.status(201).json(newComment);
  } catch (err) {
    logger.error("Error with creating comment", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports. getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(comment);
  } catch (err) {
    logger.error("Error with fetching comment", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports. getAllComment = async (req, res) => {
  try {
    // Find all comments and populate necessary fields
    const comments = await Comment.find()
      .populate({
        path: "user",
        select: "username", // Only include the username field from User model
      })
      .populate({
        path: "replies",
        populate: {
          path: "user",
          select: "username", // Only include the username field from User model
        },
      })
      .populate({
        path: "likes",
        select: "username", // Only include the username field from User model
        options: { lean: true }, // Convert to plain JavaScript objects for performance
      })
      .populate({
        path: "dislikes",
        select: "username", // Only include the username field from User model
        options: { lean: true }, // Convert to plain JavaScript objects for performance
      })
      .lean(); // Convert Mongoose documents to plain JavaScript objects for better performance and ease of use

    res.status(200).json(comments);
  } catch (err) {
    logger.error("Error with fetching comments", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Reply to a comment
exports. replyToComment = async (req, res) => {
  try {
    const { text, parentCommentId } = req.body;
    const userId = req.user;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    // Check if the parent comment exists
    const parentComment = await Comment.findById(parentCommentId);
    if (!parentComment) {
      return res.status(404).json({ error: "Parent comment not found" });
    }

    // Create the reply comment
    const newReply = await Comment.create({
      text,
      user: userId,
      parentComment: parentCommentId,
    });

    // Add the reply to the parent comment's replies array
    parentComment.replies.push(newReply._id);
    await parentComment.save();

    res.status(201).json(newReply);
  } catch (err) {
    logger.error("Error with creating reply", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// likes

exports. likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user;

    // Find the comment
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Ensure likes and dislikes are arrays
    comment.likes = comment.likes || [];
    comment.dislikes = comment.dislikes || [];

    // Toggle like
    if (comment.likes.includes(userId)) {
      comment.likes.pull(userId);
    } else {
      comment.likes.push(userId);
      comment.dislikes.pull(userId); // Ensure user can't like and dislike
    }

    // Save the updated comment
    await comment.save();
    res.status(200).json(comment);
  } catch (err) {
    logger.error("Error with liking comment", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Dislike

exports. dislikeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // If the user has already disliked the comment, remove the dislike
    if (comment.dislikes.includes(userId)) {
      comment.dislikes.pull(userId);
    } else {
      // Add the user's dislike and remove like if it exists
      comment.dislikes.push(userId);
      comment.likes.pull(userId);
    }

    await comment.save();
    res.status(200).json(comment);
  } catch (err) {
    logger.error("Error disliking comment", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
