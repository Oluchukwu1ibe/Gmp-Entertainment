import { verifyJwtToken } from "./token.js";

const authenticateToken = async (req, res, next) => {
  try {
    // Check for auth header from client
    const header = req.headers.authorization;

    if (!header) {
      next({ status: 403, message: "auth header is missing" });
      return;
    }

    // Verify auth token
    const token = header.split("Bearer ")[1];
    
    if (!token) {
      next({ status: 403, message: "auth token is missing" });
      return;
    }
    // Decode the token to get the user ID
    const decoded = verifyJwtToken(token);

     // Check if userId is available
     if (!decoded) {
       return next({ status: 403, message: "incorrect token" });
     }

    req.user = decoded;

    next();
  } catch (err) {
    next(err);
  }
};

export default authenticateToken;
