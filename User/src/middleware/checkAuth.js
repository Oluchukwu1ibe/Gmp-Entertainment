import { verifyContestantToken, verifyJwtToken } from "./token.js";

const authenticateToken = async (req, res, next) => {
  try {
    // Check for auth header from client
    const header = req.headers.authorization;

    if (!header) {
      next({ status: 403, message: "Auth header is missing" });
      return;
    }

    // Verify auth token
    const token = header.split("Bearer ")[1];
    
    if (!token) {
      next({ status: 403, message: "Auth token is missing" });
      return;
    }

    let decodedUser, decodedContestant;

    try {
      decodedUser = verifyJwtToken(token);
    } catch (error) {
      decodedUser = null;
    }

    try {
      decodedContestant = verifyContestantToken(token);
    } catch (error) {
      decodedContestant = null;
    }

    // If neither userId nor contestantId is available, the token is invalid
    if (!decodedUser && !decodedContestant) {
      return next({ status: 403, message: "Invalid token" });
    }

    if (decodedUser) {
      req.user = decodedUser;
    }

    if (decodedContestant) {
      req.contestant = decodedContestant;
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default authenticateToken;
