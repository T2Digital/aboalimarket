const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
const multer = require('multer');

dotenv.config();

const app = express();

// إعداد Multer
const upload = multer({ storage: multer.memoryStorage() });

// إعدادات EJS
app.set('view engine', 'ejs');
const viewsPath = path.join(__dirname, 'views');
app.set('views', viewsPath);
console.log('EJS Views Path:', viewsPath);

// فحص وجود مجلد القوالب
if (!fs.existsSync(viewsPath)) {
    console.error('خطأ: مجلد views غير موجود في:', viewsPath);
} else {
    console.log('مجلد views موجود، القوالب المتاحة:', fs.readdirSync(viewsPath));
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
console.log('Static Files Path:', path.join(__dirname, 'public'));

// تسجيل الطلبات قبل أي Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} | IP: ${req.ip} | Host: ${req.get('host')}`);
    next();
});

// إعدادات الجلسة
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000 }
}));
console.log('Session Middleware Configured');

// إعداد Passport
app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
console.log('Passport Configured');

// تسجيل حالة الجلسة
app.use((req, res, next) => {
    console.log(`Session ID: ${req.sessionID}, Authenticated: ${req.isAuthenticated()}, User: ${req.user ? req.user.username : 'None'}`);
    next();
});

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('تم الاتصال بقاعدة البيانات'))
    .catch(err => console.error('خطأ الاتصال بقاعدة البيانات:', err.message));

// تعريف المسارات
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');

app.use('/', authRoutes);
app.use('/admin', (req, res, next) => {
    console.log(`Routing to admin: ${req.method} ${req.originalUrl}`);
    adminRoutes(req, res, next);
});
app.use('/api', (req, res, next) => {
    console.log(`Routing to api: ${req.method} ${req.originalUrl}`);
    apiRoutes(req, res, next);
});

// مسار اختباري
app.get('/test', (req, res) => {
    console.log('GET /test: مسار اختباري');
    res.send('مسار الاختبار يعمل!');
});

// الصفحة الرئيسية للعملاء
app.get('/', (req, res) => {
    console.log('GET /: Serving index.html');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// معالجة المسارات غير الموجودة
app.use((req, res, next) => {
    console.log(`404: Route not found - ${req.method} ${req.originalUrl}`);
    res.status(404).send('404: الصفحة غير موجودة');
});

// معالجة الأخطاء
app.use((err, req, res, next) => {
    console.error('Server Error:', err.message, err.stack);
    res.status(500).json({ error: 'خطأ في السيرفر', details: err.message });
});

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // لدعم الـ proxy في Render
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`السيرفر يعمل على منفذ ${PORT}`);
});