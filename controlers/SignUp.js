const User = require('../model/user_model');
const bcrypt = require('bcryptjs');

const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        msg: "This email is already registered. Please log in instead.",
        status: false
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    // req.session.user = {
    //   _id: newUser._id,
    //   name: newUser.name,
    //   email: newUser.email,
    // };

    res.status(201).json({
      msg: "Signup successful",
      status: true,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      message: "Internal server error",
      status: false
    });
  }
};

module.exports = SignUp;
