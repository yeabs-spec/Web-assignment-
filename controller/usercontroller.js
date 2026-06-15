const User = require('../models/UserModel');

const showLoginForm = (req, res) => {
    if (req.session.user) {
        return res.redirect('/students');
    }

    res.render('login', {
        title: 'Login',
        error: ''
    });
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('login', {
                title: 'Login',
                error: 'Email and password are required.'
            });
        }

        const user = await User.findUserByEmail(email);
        if (!user || password !== user.password) {
            return res.status(400).render('login', {
                title: 'Login',
                error: 'Invalid email or password.'
            });
        }

        req.session.user = {
            id: user.uid,
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email
        };

        res.redirect('/students');
    } catch (error) {
        res.status(500).render('error', {
            title: 'Something went wrong',
            message: error.message
        });
    }
};

const logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};

module.exports = { showLoginForm, loginUser, logoutUser };
