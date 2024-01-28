const { USER } = require("../../db/db");
const { userSchema } = require("../../types");

async function validateSignin(req, res, next) {
  const data = req.body;

  const isValid = await USER.findOne(data);

  if (!isValid) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }
  next();
}

module.exports = { validateSignin };
