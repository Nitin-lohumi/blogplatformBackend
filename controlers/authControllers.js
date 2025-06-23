const jwt = require("jsonwebtoken");
const loginSuccess = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({
      message: 'Login successful',
      user: decoded, // This contains email, name, and id from the token
    });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,          
      sameSite: "None",     
    });
    res.json({ message: 'Logout successful', status: true });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { loginSuccess, logout };
