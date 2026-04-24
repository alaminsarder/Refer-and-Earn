const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, referralCode } = req.body;
    let userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const myCode = name.substring(0, 3).toUpperCase() + Math.floor(1000 + Math.random() * 9000);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      referralCode: myCode,
      referredBy: referralCode || null
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", myCode });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({ token, user: { id: user._id, name: user.name, referralCode: user.referralCode } });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};