import Video from "../models/videos.js";
import { createJwtToken, verifyContestantToken } from "../middleware/token.js";
import Contestant from "../models/contestant.js";
import cloudinary from "../utils/cloudinary.js";
import { sendFgPasswordLink, sendResetPassConfirmation, sendVerificationEmail, sendWelcomeEmail } from "../utils/email-sender.js";
import generateOtp from "../utils/otpGenerator.js";

// register contestant
export const createContestant = async (req, res) => {
    try {
      const {FullName,email,password} = req.body;
      
      // Validate input
      if (!(FullName||email||password)) {
        return res.status(400).json({ error: "Please input all fields" });
      }
  
  
      // Check if contestant already exists
      const existingContestant = await Contestant.findOne({ email });
      if (existingContestant) {
        return res.status(409).json({ message: "Contestant with this email already exists." });
      }
  
      
  
      // Save new contestant to the database
      const contestant = await Contestant.create({
        FullName,
        email,
        password,
        // image: results.map((result) => result.imageUrl), // Use results instead of result
      });
  // generate OTP and save it to the database
  let otp = generateOtp();
  const otpExpirationTime = new Date(Date.now() + 5 * 60 * 1000);
  contestant.otpCode = otp;
  contestant.otpExpirationTime = otpExpirationTime;
  await contestant.save();
  //send verification Email with generated OTP
  await sendVerificationEmail(contestant.email, otp);
      res.status(201).json({ message: `OTP successfully sent to ${contestant.email}`, contestant });
    } catch (error) {
      console.error("Error in creating contestant", error);
      res.status(500).json({ error: "Server Error" });
    }
  };
 
  // verify the otp
  export const verifyOtp = async (req, res) => {
    try {
      //  input
      const { otpCode } = req.body;
      if (!otpCode) {
        return res
          .status(400)
          .json({ message: "Please provide the otp code sent" });
      }
      // check if user  exist
      const contestant = await Contestant.findById({ _id: req.params.contestant_id });
      if (!contestant) {
        return res.status(404).json({ message: "Contestant not Found" });
      }
  
      // Check if user is already verified
      if (contestant.isVerified) {
        return res.status(409).json({ message: "Contestant is already verified" });
      }
  
      //    check if the otp is correct
      if (contestant.otpCode !== otpCode) {
        return res.status(400).json({message:"OTP is incorrect"});
      }
      
      // Check if OTP has expired
      if (Date.now() > new Date(contestant.otpExpirationTime).getTime()) {
        return res.status(409).json({ message: 'OTP expired, please resend OTP' });
      };
      //create a payload and tokenize it
      const payload = {
        contestantId: contestant._id,
        FullName: contestant.FullName,
        email: contestant.email,
      };
      const token = createJwtToken(payload);
      // Mark isVerified and clear OTP
      contestant.isVerified = true;
      contestant.otpCode = null;
      contestant.otpExpirationTime = null;
      await contestant.save();
      //send welcome email
      await sendWelcomeEmail(contestant.email);
      // success response
      // logger.info(user._doc);
      return res.status(200).json({
        success: true,
        message: "OTP successfully verified",
        contestant,
        token,
      });
    } catch (error) {
      return res.status(503).json({
        error: error.message,
        message: "An error occurred during OTP verification",
      });
    }
  };

  export const resendOtp = async (req, res) => {
  try {
    const { contestantId } = req.body;

    const contestant = await Contestant.findById(contestantId);
    if (!contestant) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a new OTP code
    const otpCode = generateOtp(); // Assume you have a function to generate OTP code
    // Set expiration time to 5 minutes from now
    const otpExpirationTime = new Date(Date.now() + 5 * 60 * 1000);

    // Update user document with new OTP code and expiration time
    contestant.otpCode = otpCode;
    contestant.otpExpirationTime = otpExpirationTime;
    await contestant.save();

    // Send email with new OTP
    await sendVerificationEmail(contestant.email, otpCode);

    return res.status(200).json({ message: 'OTP resent successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while resending OTP', error: error.message });
  }
};

  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      // validate input
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Please provide an email and password" });
      }
      // find the user by their email address
      const contestant = await Contestant.findOne({ email });
  
      if (!contestant) {
        return res.status(401).json({ message: "Invalid email" });
      }
  
      const isPasswordValid = await contestant.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }
      // check if the otp has been verified and if not delete the contestant credentials
if(!contestant.isVerified){
  await Contestant.findByIdAndDelete(contestant.id);
  return res.status(403).json({ message: "Please verify your email first" });
};
      //  Create JWT payload and sign the token
      const payload = {
        contestantId: contestant._id,
        FullName: contestant.FullName,
        email: contestant.email,
      };
      const token = createJwtToken(payload);
  
      return res.status(201).json({ message: "Contestant login successfully", token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  };

  // forgot password
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // Validate input
    if (!email) {
      res.status(400).json({message:"Invalid email"});
      return;
    }
    // Check if user exist
    const contestant = await Contestant.findOne({ email });
    if (!contestant) {
      res.status(404).json({message:"Contestant doesn't Exist"});
      return;
    }
    // Generate token and resetLink
    const resetToken = createJwtToken(
      { contestantId: contestant._id },
      { expiresIn: "5m" }
    );
    if (!resetToken) {
      return res
        .status(409)
        .json({ message: "An error occurred,Please try again later" });
    }
    const resetLink = `http://localhost:2024/api/reset-password/:${resetToken}`;

    // Save resetLink
    contestant.resetLinkToken = resetToken;
    await contestant.save();
    // Send email
   await sendFgPasswordLink(email,resetLink);
   return res.status(200).json({ message: "Your Password Reset link has been sent to your mail" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// reset password
export const resetPassword = async (req, res, next) => {
  try {
    const { newPass, resetLinkToken } = req.body;
    if (resetLinkToken) {
      // Verify token
      const decodedToken = verifyContestantToken(resetLinkToken, next);

      if (!decodedToken) {
        return res.status(401).json({
          error: "Incorrect Token or it's expired.",
        });
      }

      // Find user by resetLinkToken
      const contestant = await Contestant.findOne({ resetLinkToken });
      if (!contestant) {
        return res
          .status(404)
          .json({ error: "Contestant with this reset-link doesn't exist" });
      }

      // Update user's password and resetLinkToken
      contestant.password = newPass;
      contestant.resetLinkToken = null;
      await contestant.save();

      // Send email
      await sendResetPassConfirmation(contestant.email);
      return res
        .status(200)
        .json({ message: "Contestant password reset successfully" });
    } else {
      return res.status(401).json({ error: "Authentication error" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

//   Get all contestant
export const getAllContestants = async (req, res) => {
  try {
    const contestants = await Contestant.find();
    res.status(200).json(contestants);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
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
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// profile
export const contestantProfile = async(req,res)=>{
try{
  const contestantId = req.contestant;

    // Find the contestant by ID
    const contestant = await Contestant.findById(contestantId);
    
    if (!contestant) {
      return res.status(404).json({ error: "Contestant not found" });
    }
res.status(200).json({message:'Contestant Profile'},contestant);
}catch(error){
  console.log(error.message);
  return res.status(500).json({ message: error.message });
}
};
// update profile
export const updateContestant = async (req, res) => {
  try {
    const contestantId = req.contestant;
    const updatedData = req.body;
    if(!updatedData){
      return res.status(400).json({error:'No data provided'});
    }

    const contestant = await Contestant.findByIdAndUpdate(contestantId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!contestant) {
      return res.status(404).json({
        success: false,
        message: "Contestant not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contestant updated successfully",
      contestant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteContestant = async (req, res) => {
  try {
    const contestant = await Contestant.findById(req.params.id);
    if (!contestant) {
      return res.status(404).json({
        success: false,
        message: "Contestant not found",
      });
    }

    // Delete the associated video
    await Video.deleteOne({ contestant: contestant._id });

    // Delete the contestant
    await contestant.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Contestant and associated video deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// upload image
export const uploadImage = async (req, res) => {
  try {
    const contestantId = req.contestant;

    // Validate contestantId
    if (!contestantId) {
      return res.status(400).json({ error: "Contestant ID is required" });
    }

    // Find the contestant by ID
    const contestant = await Contestant.findById(contestantId);

    if (!contestant) {
      return res.status(404).json({ error: "Contestant not found" });
    }

    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });

    // Save the image URL in the contestant database
    contestant.image = result.secure_url;
    await contestant.save();

    res.status(200).json({ message: "Image uploaded successfully",contestant});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while uploading the image" });
  }
};

// upload video content
export const uploadVideo = async (req, res) => {
  try {
    const contestantId = req.contestant;

    // Find the contestant by ID
    const contestant = await Contestant.findById(contestantId);
    
    if (!contestant) {
      return res.status(404).json({ error: "Contestant not found" });
    }

    const { title, description } = req.body;

    // Validate input fields
    if (!title || !description) {
      return res.status(400).json({ message: "Please input all fields" });
    }

    // Check if the contestant has already posted the video (assuming you want to limit one video per contestant)
    const existingVideo = await Video.findOne({ contestant: contestantId });
    if (existingVideo) {
      return res.status(400).json({ message: "Contestant has already uploaded a video" });
    };

     // Ensure the file is uploaded
     if (!req.file) {
      return res.status(400).json({ message: "No video file uploaded" });
    }

    // Upload the video to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "video" });

    // Save the video to the database
    const video = await Video.create({
      title,
      description,
      contestant: contestantId,
      Video: result.secure_url,
    });

    // Respond with the created video
    return res.status(201).json({
      success: true,
      message: "Video uploaded successfully",
      video
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// delete video

export const deleteVideo =async(req,res)=>{
  try {
    const contestantId = req.contestant;

    // Validate contestantId
    if (!contestantId) {
      return res.status(400).json({ error: "Contestant ID is required" });
    }

    // Find the contestant by ID
    const contestant = await Contestant.findById(contestantId);
    if (!contestant) {
      return res.status(404).json({ error: "Contestant not found" });
    }
        // Find the video associated with the contestant
        const video = await Video.findOne({ contestant });
        
        if (!video) {
          return res.status(404).json({ error: "Video not found" });
          }
    
        // Delete the video
        await Video.deleteOne({ _id: video._id });
    
        return res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}