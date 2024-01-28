const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function authMiddleware(req, res, next) {
  const tokenString = req.headers.authorization;

  const authHeader = tokenString.split(" ");
  if (!authHeader || authHeader.startsWith("Bearer")) {
    return res.status(403).json({
      message: "Unauthorized user ",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({});
  }
}

module.exports = {
  authMiddleware,
};
