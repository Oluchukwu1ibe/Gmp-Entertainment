import  jwt from "jsonwebtoken";

export const createJwtToken = (payload) => {
  const token = jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: "1day" });
  return token;
};

export const verifyJwtToken = (token,next) => {
  try {
    const { userId } = jwt.verify(token, process.env.TOKEN_KEY);
    return userId;
  } catch (err) {
    next();
    console.log(err.message);
  }
};