const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/user_model");

const ManualLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user existence
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "User not found", status: false });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials", status: false });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send token in secure cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // 🔐 Only over HTTPS
        sameSite: "None", // 🔄 Allow cross-origin cookies
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json({
        msg: "Login successful",
        status: true,
        user: { name: user.name, email: user.email }, // optional
      });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Internal Server Error", status: false });
  }
};

module.exports = ManualLogin;
