const { userSchema } = require("../../types");

function validateUser(req, res, next) {
  const data = req.body;
  const isValid = userSchema.safeParse(data);
  if (isValid.success === false) {
    return res.status(401).json({
      message: "Details are not correct",
    });
  }
  next();
}

module.exports = { validateUser };
