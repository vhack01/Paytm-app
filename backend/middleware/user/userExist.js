const { USER } = require("../../db/db");
async function userExist(req, res, next) {
  const username = req.body.username;
  const isExist = await USER.findOne({ username: username });
  if (isExist) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  next();
}

module.exports = {
  userExist,
};
