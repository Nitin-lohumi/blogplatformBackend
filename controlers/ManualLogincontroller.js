const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/user_model");

const ManualLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "User not found", status: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials", status: false });
    }
    const token = jwt.sign(
      { _id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    if (!user.picture) {
      user.picture = "../public/pngwing.com (12).png";
      user.save();
    }
    console.log(user.picture);
    res.status(200).json({
      msg: "Login successful",
      status: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, picture: user.picture },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Internal Server Error", status: false });
  }
};

module.exports = ManualLogin;
