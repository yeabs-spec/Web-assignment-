const siteMiddleware = (req, res, next) => {
    res.locals.currentPath = req.path;
    res.locals.siteName = 'Student Manager';
    res.locals.currentUser = req.session.user || null;
    next();
};

module.exports = siteMiddleware;
