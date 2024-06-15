const School = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const signupUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await School.signup(name, password);
    const token = createToken(user._id);
    res.status(200).json({ username, email, password, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await School.login(name, password);
    const token = createToken(user._id);
    res.status(200).json({ username, password, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
