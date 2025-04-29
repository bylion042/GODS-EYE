const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { createShortUrl } = require('../utils/shortenUrl');



// Render registration page
router.get('/register', (req, res) => {
    res.render('register', { message: null, type: null });
});
// Handle registration form submission
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('register', { message: 'Email is already taken.', type: 'error' });
        }

        const user = new User({ username, email, password });
        await user.save();

        res.render('/dashboard', { message: 'Registration successful!.', type: 'success' });
    } catch (err) {
        console.error('Error creating user:', err);
        res.render('register', { message: 'Something went wrong. Please try again.', type: 'error' });
    }
});




// Render login page
router.get('/login', (req, res) => {
    res.render('login', { message: null, type: null });
});
// Handle login form submission
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.render('login', { message: 'User not found. Please register first.', type: 'error' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.render('login', { message: 'Incorrect password.', type: 'error' });
        }

        req.session.userId = user._id;
        res.redirect('/dashboard');
        
    } catch (err) {
        console.error('Error during login:', err);
        res.render('login', { message: 'Internal server error. Try again later.', type: 'error' });
    }
});





// In your dashboard route
router.get('/dashboard', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    try {
        const user = await User.findById(req.session.userId);
        res.render('dashboard', { user, userId: req.session.userId }); // Pass userId here
    } catch (err) {
        console.error('Error loading dashboard:', err);
        res.status(500).send('Error loading dashboard');
    }
});


// Render UPDATE page
router.get('/update', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    try {
        const user = await User.findById(req.session.userId);
        res.render('update', { user, userId: req.session.userId }); // pass user and userId
    } catch (err) {
        console.error('Error loading update page:', err);
        res.status(500).send('Error loading update page');
    }
});


// Render HOW TO USE page
router.get('/how2use', (req, res) => {
    res.render('how2use');
});



module.exports = router;
