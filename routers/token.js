const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.get("/", (req, res) => {
    const id = process.env.JWT_SECRET;
    const token = jwt.sign({ id }, "jwtSecret", {
        expiresIn: 300
    })
    res.json({ token: token })
})

module.exports = router;