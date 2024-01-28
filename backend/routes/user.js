const express = require("express");
const { userExist } = require("../middleware/user/userExist");
const { validateUser } = require("../middleware/user/validateUser");
const { validateSignin } = require("../middleware/user/validateSignin");
const jwt = require("jsonwebtoken");
const { USER } = require("../db/db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware/middleware");
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

router.put("/", authMiddleware, userExist, async (req, res) => {
  const username = req.headers.userId;
  const data = req.body;

  const existingData = await USER.findOne({ username: username });
  if (!existingData) {
    return res.status(411).json({});
  }

  if (data.password.length < 4) {
    return res
      .status(411)
      .json({ message: "Error while updating information" });
  }

  const isUpdated = await USER.updateOne(
    { username },
    {
      ...existingData,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    }
  );
  console.log("isupdated: ", isUpdated);
  if (!isUpdated) {
    return res.status(411).json({
      message: "Failed to update information",
    });
  }

  res.status(200).json({
    message: "Updated successfully",
  });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.params.filter;

  const users = await USER.find({});

  if (!users) {
    return res.status(404).json({
      message: "No user found",
    });
  }

  const filteredUsers = users.filter(
    (user) => user.firstName.includes(filter) || user.lastName.includes(filter)
  );

  res.status(200).json({
    users: filteredUsers,
  });
});

module.exports = router;
