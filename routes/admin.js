// routes/admin.js
const express = require('express');
const router = express.Router();

router.get('/admin-login', (req, res) => {
  res.render('admin_login', { error: null }); // renders views/admin_login.ejs
});

router.post('/admin-login', (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    res.redirect('/gods-eye');
  } else {
    res.render('admin_login', { error: 'Incorrect password' });
  }
});

module.exports = router;
