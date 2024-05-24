import  jwt from "jsonwebtoken";

export const createJwtToken = (payload) => {
  const token = jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: "1day" });
  return token;
};

export const verifyJwtToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    if (!decoded.userId) {
      throw new Error('User ID not found in token');
    }
    return decoded.userId;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const verifyContestantToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    if (!decoded.contestantId) {
      throw new Error('Contestant ID not found in token');
    }
    return decoded.contestantId;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

