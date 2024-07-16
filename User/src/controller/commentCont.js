import User from "../models/User.js";
import Comment from "../models/comment.js";


export const createComment = async(req, res) => {
    try {
        const { text} = req.body;
        if (!text) {
            return res.status(400).json({error:'Text is required'});
        }
        const userId = req.user;
        
        // Check if the userId exists
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({error:'User not found'});
        }

        const newComment = await Comment.create({ text, user: userId });
        res.status(201).json(newComment);
    } catch (err) {
        console.error('Error creating comment', err);
        res.status(500).json({error:'Internal Server Error'});
    }
};

export const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({error:'Comment not found'});
        }
        res.json(comment);
    } catch (err) {
        console.error('Error fetching comment', err);
        res.status(500).json({error:'Internal Server Error'});
    }
};

export const getAllComment = async (req, res) => {
    try {
        const comment = await Comment.find();
         res.status(200).json(comment);
    } catch (err) {
        console.error('Error fetching comments', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};