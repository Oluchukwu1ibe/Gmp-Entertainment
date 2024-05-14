import  jwt from "jsonwebtoken";

export const createJwtToken = (payload) => {
  const token = jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: "1day" });
  return token;
};

export const verifyJwtToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    return decoded.userId;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

