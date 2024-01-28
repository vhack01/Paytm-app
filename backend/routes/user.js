const express = require("express");
const { userExist } = require("../middleware/user/userExist");
const { validateUser } = require("../middleware/user/validateUser");
const { validateSignin } = require("../middleware/user/validateSignin");
const jwt = require("jsonwebtoken");
const { USER } = require("../db/db");
const { JWT_SECRET } = require("../config");
const router = express.Router();

router.post("/signup", userExist, validateUser, async (req, res) => {
  const data = req.body;
  const isCreated = await USER.create(data);
  if (!isCreated) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  let token = null;
  try {
    token = jwt.sign({ userId: data.username }, JWT_SECRET);
  } catch (err) {
    console.log("ERROR: ", err);
    return res.status(500).json({
      message: "TOKEN : Internal Server Error",
    });
  }

  res.status(200).json({
    message: "User created successfully",
    token,
  });
});

router.post("/signin", validateSignin, (req, res) => {
  const username = req.body.username;
  let token = null;
  try {
    token = jwt.sign({ userId: username }, JWT_SECRET);
  } catch (err) {
    return res.status(500).json({
      message: "TOKEN : Internal Server Error",
    });
  }

  res.status(200).json({
    token,
  });
});

module.exports = router;
