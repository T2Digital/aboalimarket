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

// الاتصال بقاعدة البيانات أولاً
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('تم الاتصال بقاعدة البيانات'))
    .catch(err => console.error('خطأ الاتصال بقاعدة البيانات:', err.message));

// إعدادات الجلسة
console.log('SESSION_SECRET:', process.env.SESSION_SECRET);
const store = MongoStore.create({ 
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions',
    ttl: 24 * 60 * 60, // 24 ساعة
    touchAfter: 24 * 3600 // تقليل الكتابة غير الضرورية
});
store.on('error', (err) => console.error('MongoStore Error:', err));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { 
        httpOnly: true,
        secure: false, // غيرناها لـ false للتجربة على localhost
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 24 ساعة
    }
}));
console.log('Session Middleware Configured');

// لوج لفحص بيانات الجلسة
app.use((req, res, next) => {
    console.log(`Session ID: ${req.sessionID}, Session Data:`, req.session);
    next();
});

// إعداد Passport
app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser((user, done) => {
    console.log('Serializing user:', user.id);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        console.log('Deserializing user with ID:', id);
        const user = await User.findById(id);
        if (user) {
            console.log('User found:', user.username);
            done(null, user);
        } else {
            console.log('User not found');
            done(null, false);
        }
    } catch (err) {
        console.error('Error in deserializeUser:', err);
        done(err);
    }
});
console.log('Passport Configured');

// تسجيل حالة الجلسة
app.use((req, res, next) => {
    console.log(`Session ID: ${req.sessionID}, Authenticated: ${req.isAuthenticated()}, User: ${req.user ? req.user.username : 'None'}`);
    next();
});

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

// مسار اختبار للسيشن
app.get('/test-session', (req, res) => {
    console.log('GET /test-session: Checking session');
    res.json({
        sessionID: req.sessionID,
        isAuthenticated: req.isAuthenticated(),
        user: req.user ? req.user.username : 'None',
        session: req.session
    });
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