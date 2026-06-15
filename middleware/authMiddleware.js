const authMiddleware = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    res.locals.currentUser = req.session.user;
    next();
};

module.exports = authMiddleware;
