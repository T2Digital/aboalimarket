const express = require('express');
const passport = require('passport');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// فحص وجود القالب
function checkTemplate(templatePath, templateName) {
    if (!fs.existsSync(templatePath)) {
        console.error(`خطأ: القالب ${templateName} غير موجود في: ${templatePath}`);
        return false;
    }
    console.log(`القالب ${templateName} موجود في: ${templatePath}`);
    return true;
}

// صفحة تسجيل الدخول
router.get('/login', (req, res, next) => {
    console.log('GET /login: Accessing login route');
    const templatePath = path.join(__dirname, '../views', 'login.ejs');
    if (!checkTemplate(templatePath, 'login.ejs')) {
        return res.status(500).send('خطأ: قالب تسجيل الدخول غير موجود');
    }
    console.log('GET /login: Rendering login page');
    res.render('login', { title: 'تسجيل الدخول', error: req.query.error || null });
});

// معالجة تسجيل الدخول
router.post('/login', (req, res, next) => {
    console.log('POST /login: Attempting authentication', { username: req.body.username });
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Authentication error:', err);
            return next(err);
        }
        if (!user) {
            console.log('Authentication failed:', info ? info.message : 'No info');
            return res.redirect('/login?error=بيانات تسجيل الدخول غير صحيحة');
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error('Login error:', err);
                return next(err);
            }
            console.log(`User ${user.username} logged in successfully`);
            return res.redirect('/admin');
        });
    })(req, res, next);
});

// تسجيل الخروج
router.get('/logout', (req, res, next) => {
    console.log('GET /logout: Logging out user');
    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err);
            return next(err);
        }
        req.session.destroy((err) => {
            if (err) {
                console.error('Session destroy error:', err);
                return next(err);
            }
            res.clearCookie('connect.sid');
            console.log('User logged out successfully');
            res.redirect('/login');
        });
    });
});

module.exports = router;