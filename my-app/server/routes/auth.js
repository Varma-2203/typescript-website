const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, picture } = ticket.getPayload();
    const userToken = jwt.sign({ name, email, picture }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ name, email, picture, token: userToken });
  } catch (error) {
    res.status(401).json({ error: "Invalid Google token" });
  }
});

module.exports = router;