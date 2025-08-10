const jwt = require("jsonwebtoken");
const User = require("../model/User");

const generateToken = (user) => jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

exports.registerUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;
  const user = await User.create({ name, email, password, address, role });
  const token = generateToken(user);
  res.status(201).json({ token, user });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: "Invalid credentials" });
  const token = generateToken(user);
  res.json({ token, user });
};

exports.updatePassword = async (req, res) => {
  const { id, newPassword } = req.body;
  if (!id || !newPassword) return res.status(400).json({ message: "id and newPassword are required" });
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.password = newPassword;
  console.log("Updating password for user:", user._id);
  await user.save();
  res.json({ message: "Password updated" });
};

exports.getallProfile = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};