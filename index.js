const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const session = require('express-session');
const passport = require('passport');

const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
require('./config/passport-setup');

const app = express();

app.set('view engine', 'ejs');

app.use(session({
    secret: 'sgdgsgsdgsdhsdh',
    resave: false,
    saveUninitialized: false
}));
// app.use(cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: ['gdgksggew532523f']
// }));

app.use(passport.initialize());
app.use(passport.session()); //use cookies

mongoose.connect('mongodb+srv://sujan:sujan@cluster0.znixubu.mongodb.net/test?retryWrites=true&w=majority');

mongoose.connection.on('connected', () => {
    console.log('Connected to DB');
});

mongoose.connection.on('error', () => {
    console.log('Error connected to DB');
});

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});