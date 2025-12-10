const { verify, sign } = require("jsonwebtoken");

const secret = process.env.TOKEN_SECRET;
const expiresIn = "2h";

const decodeToken = (token) => {
  if (!token) return;
  try {
    return verify(token, secret);
  } catch (err) {
    return undefined;
  }
};

const encodeToken = (payload) => {
  return sign(payload, secret, { expiresIn });
};

module.exports = { decodeToken, encodeToken };
