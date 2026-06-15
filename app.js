const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
require('dotenv').config({ override: true });

const studentRoutes = require('./routes/studentRoutes');
const userRoutes = require('./routes/userRoutes');
const siteMiddleware = require('./middleware/siteMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const User = require('./models/UserModel');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'student-manager-secret',
    resave: false,
    saveUninitialized: false
}));
app.use(siteMiddleware);

app.get('/', (req, res) => {
    if (req.session.user) {
        return res.redirect('/students');
    }

    res.redirect('/login');
});

app.use('/', userRoutes);
app.use('/students', authMiddleware, studentRoutes);

app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Page not found'
    });
});

const PORT = process.env.APP_PORT || process.env.PORT || 5000;

const startServer = async () => {
    await User.ensureDefaultUser();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer().catch((error) => {
    console.error(error);
    process.exit(1);
});
