const mongoose = require("mongoose");
const { mongodb_url } = require("../config");
mongoose.connect(mongodb_url);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 4,
  },
});

const USER = mongoose.model("USER", userSchema);

module.exports = {
  USER,
};
