 const loginSuccess = (req, res) => {
    if (req.user||req.session.user) {//google login or manual login
        res.status(200).json({
        message: 'Login successful',
        user: req.user||req.session.user,
      });
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
};
  
 const logout = async(req, res) => {
 try {
  if (req.session.user && req.session.user.googleToken) {
    await googleClient.revokeToken(req.session.user.googleToken);
  }
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Failed to log out' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout successful',status:true});
  });
} catch (error) {
  console.error('Logout error:', error);
  res.status(500).json({ error: 'Internal server error' });
}
};
  
module.exports = {loginSuccess,logout};