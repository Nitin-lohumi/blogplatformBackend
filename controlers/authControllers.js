const jwt = require("jsonwebtoken");

const loginSuccess = (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.status(200).json({
      message: 'Login successful',
      user: decoded,
    });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const logout = async (req, res) => {
  try {
    res.json({ message: 'Logout successful', status: true });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { loginSuccess, logout };
