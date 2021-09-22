const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]

    if (!token) {
        res.send("You don't have a token")
    }
    else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                res.json({ message: "failed" })
            }
            else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}

module.exports = verifyJWT;