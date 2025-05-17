function isAuthenticated(req, res, next) {
    console.log('isAuthenticated Middleware:', {
        isAuthenticated: req.isAuthenticated(),
        user: req.user ? req.user.username : 'None',
        sessionID: req.sessionID,
        sessionExists: req.session ? true : false
    });
    if (req.isAuthenticated()) {
        console.log('isAuthenticated: User is authenticated, proceeding');
        return next();
    }
    console.log('isAuthenticated: User not authenticated, redirecting to /login');
    res.redirect('/login');
}

module.exports = { isAuthenticated };