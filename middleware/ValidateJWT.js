const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ msg: "No token provided in cookie" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }
};

module.exports = verifyJWT;
