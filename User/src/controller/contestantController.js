import Contestant from "../models/contestant.js";
import cloudinary from "../utils/cloudinary.js";

// register contestant
export const createContestant = async (req, res) => {
    try {
      const { name} = req.body;
      
      // Validate input
      if (!name) {
        return res.status(400).json({ error: "Please provide a name" });
      }
  
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "Please upload an image" });
      }
  
      // Check if contestant already exists
      const existingContestant = await Contestant.findOne({ name });
      if (existingContestant) {
        return res.status(409).json({ message: "Contestant with this name already exists." });
      }
  
      // Upload images to cloudinary
      const results = await Promise.all(
        req.files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path);
          return {
            publicId: result.public_id,
            imageUrl: result.secure_url,
          };
        })
      );
  
      // Save new contestant to the database
      const contestant = await Contestant.create({
        name,
        image: results.map((result) => result.imageUrl), // Use results instead of result
      });
  
      res.status(201).json({ message: "Contestant created successfully", contestant });
    } catch (error) {
      console.error("Error in creating contestant", error);
      res.status(500).json({ error: "Server Error" });
    }
  };
  

//   Get all contestant
export const getAllContestants = async (req, res) => {
  try {
    const contestants = await Contestant.find();
    res.status(200).json(contestants);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// Get a single contestant by Id or name
export const getContestantByIdOrName = async (req, res) => {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  } else if (req.params.name) {
    query.name = req.params.name;
  }

  try {
    const contestant = await Contestant.findOne(query);
    if (!contestant) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json(contestant);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
