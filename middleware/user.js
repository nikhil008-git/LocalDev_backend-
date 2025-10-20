const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

function userMiddleware(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.status(401).json({ message: "No token provided" });

        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: "Invalid token format" });

        const decoded = jwt.verify(token, JWT_USER_PASSWORD);

        // Attach the whole decoded payload as req.user
        req.user = decoded;

        next();
    } catch (err) {
        console.error("JWT verification error:", err);
        res.status(403).json({ message: "You are not signed in" });
    }
}

module.exports = { userMiddleware };
