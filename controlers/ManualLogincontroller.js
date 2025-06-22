const bcryptjs = require("bcryptjs");
const User = require("../model/user_model");

const ManualLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: "User not found", status: false });
        }
        // Compare passwords
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Incorrect password", status: false });
        }
        // Store user in session (for session-based login)
        req.session.user = {
            _id: user._id,
            email: user.email,
            name: user.name,
        };
        return res.status(200).json({
            msg: "Login successful",
            status: true,
            userData: req.session.user,
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            msg: "Internal server error",
            status: false,
        });
    }
};

module.exports = ManualLogin;
