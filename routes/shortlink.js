// routes/shortlink.js
const express = require('express');
require('dotenv').config();
const router = express.Router();
const User = require('../models/User');
const { createShortUrl } = require('../utils/shortenUrl');

// Render the short link page
router.get('/shortlink', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    try {
        const user = await User.findById(req.session.userId);
        res.render('shortlink', { user, userId: req.session.userId }); // IMPORTANT
    } catch (err) {
        console.error('Error loading shortlink page:', err);
        res.status(500).send('Error loading shortlink page');
    }
});


// Handle POST for shortening
router.post('/shorten', async (req, res) => {
    console.log('BODY:', req.body); // Debug

    const { originalUrl, customShort } = req.body;

    if (!originalUrl) {
        return res.status(400).json({ message: 'Original URL is required' });
    }

    try {
        const shortUrl = await createShortUrl(originalUrl, customShort);
        res.json({ shortUrl });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Failed to shorten URL' });
    }
});

module.exports = router;
