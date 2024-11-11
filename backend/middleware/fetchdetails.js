const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || "HaHa"; // Use environment variable for the secret

const fetch = (req, res, next) => {
    // Get the user from the JWT token and add id to req object
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).send({ error: "Unauthorized: No Auth Token Provided" });
    }

    try {
        const data = jwt.verify(token, jwtSecret);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ error: "Unauthorized: Invalid Auth Token" });
    }
};

module.exports = fetch;
