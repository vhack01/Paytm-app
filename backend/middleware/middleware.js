const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function authMiddleware(req, res, next) {
  const tokenString = req.headers.authorization;

  const tokenStrings = tokenString.split(" ");
  if (tokenStrings.length < 2 || tokenStrings[0] !== "Bearer") {
    return res.status(403).json({
      message: "Unauthorized user ",
    });
  }

  next();
}

module.exports = {
  authMiddleware,
};
