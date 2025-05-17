const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const fs = require('fs');
const path = require('path');
const Order = require('../models/Order');
const moment = require('moment');

// فحص وجود القالب
function checkTemplate(templatePath, templateName) {
    if (!fs.existsSync(templatePath)) {
        console.error(`خطأ: القالب ${templateName} غير موجود في: ${templatePath}`);
        return false;
    }
    console.log(`القالب ${templateName} موجود في: ${templatePath}`);
    return true;
}

// الصفحة الرئيسية للوحة الإدارة
router.get('/', isAuthenticated, (req, res) => {
    console.log('GET /admin: Accessing admin dashboard');
    const templatePath = path.join(__dirname, '../views', 'admin.ejs');
    if (!checkTemplate(templatePath, 'admin.ejs')) {
        return res.status(500).send('خطأ: قالب لوحة الإدارة غير موجود');
    }
    res.render('admin', { title: 'لوحة الإدارة' });
});

// صفحة تحديث المتجر
router.get('/update-store', isAuthenticated, (req, res) => {
    console.log('GET /admin/update-store: Accessing update-store page');
    const templatePath = path.join(__dirname, '../views', 'update-store.ejs');
    if (!checkTemplate(templatePath, 'update-store.ejs')) {
        return res.status(500).send('خطأ: قالب تحديث المتجر غير موجود');
    }
    res.render('update-store', { title: 'تحديث المتجر' });
});

// صفحة إحصائيات المبيعات
router.get('/sales', isAuthenticated, async (req, res) => {
    console.log('GET /admin/sales: Accessing sales page');
    const templatePath = path.join(__dirname, '../views', 'sales.ejs');
    if (!checkTemplate(templatePath, 'sales.ejs')) {
        return res.status(500).send('خطأ: قالب إحصائيات المبيعات غير موجود');
    }
    try {
        const { startDate, endDate, period } = req.query;
        const effectivePeriod = period && ['all', 'today', 'week', 'month', 'year'].includes(period) ? period : 'all';
        console.log(`GET /admin/sales: Filter params - period: ${effectivePeriod}, startDate: ${startDate || 'none'}, endDate: ${endDate || 'none'}`);
        let query = { status: { $ne: 'cancelled' } };

        if (startDate && endDate) {
            query.createdAt = {
                $gte: moment(startDate).startOf('day').toDate(),
                $lte: moment(endDate).endOf('day').toDate()
            };
        } else if (effectivePeriod !== 'all') {
            const now = moment();
            switch (effectivePeriod) {
                case 'today':
                    query.createdAt = {
                        $gte: now.startOf('day').toDate(),
                        $lte: now.endOf('day').toDate()
                    };
                    break;
                case 'week':
                    query.createdAt = {
                        $gte: now.startOf('week').toDate(),
                        $lte: now.endOf('day').toDate()
                    };
                    break;
                case 'month':
                    query.createdAt = {
                        $gte: now.startOf('month').toDate(),
                        $lte: now.endOf('day').toDate()
                    };
                    break;
                case 'year':
                    query.createdAt = {
                        $gte: now.startOf('year').toDate(),
                        $lte: now.endOf('day').toDate()
                    };
                    break;
            }
        }

        console.log('GET /admin/sales: Query:', JSON.stringify(query));
        const orders = await Order.find(query).populate({
            path: 'products.product',
            model: 'Product'
        });
        console.log(`GET /admin/sales: Fetched ${orders.length} orders`);
        const totalSales = orders.reduce((sum, order) => sum + (order.total || 0), 0);
        const totalOrders = orders.length;
        console.log('GET /admin/sales: totalSales:', totalSales, 'totalOrders:', totalOrders);
        res.render('sales', {
            title: 'إحصائيات المبيعات',
            orders: orders,
            totalSales: totalSales,
            totalOrders: totalOrders,
            startDate: startDate || '',
            endDate: endDate || '',
            period: effectivePeriod
        });
    } catch (err) {
        console.error('GET /admin/sales: Error:', err.message);
        res.status(500).json({ error: 'خطأ في السيرفر', details: err.message });
    }
});

// صفحة متابعة الطلبات
router.get('/orders', isAuthenticated, async (req, res) => {
    console.log('GET /admin/orders: Accessing orders page');
    const templatePath = path.join(__dirname, '../views', 'orders.ejs');
    if (!checkTemplate(templatePath, 'orders.ejs')) {
        return res.status(500).send('خطأ: قالب متابعة الطلبات غير موجود');
    }
    try {
        const { startDate, endDate } = req.query;
        console.log(`GET /admin/orders: Filter params - startDate: ${startDate || 'none'}, endDate: ${endDate || 'none'}`);
        let query = { status: { $ne: 'cancelled' } };
        if (startDate && endDate) {
            query.createdAt = {
                $gte: moment(startDate).startOf('day').toDate(),
                $lte: moment(endDate).endOf('day').toDate()
            };
        }
        console.log('GET /admin/orders: Query:', JSON.stringify(query));
        const orders = await Order.find(query).populate({
            path: 'products.product',
            model: 'Product'
        });
        console.log(`GET /admin/orders: Fetched ${orders.length} orders`);
        const totalSales = orders.reduce((sum, order) => sum + (order.total || 0), 0);
        console.log('GET /admin/orders: totalSales:', totalSales);
        res.render('orders', {
            title: 'متابعة الطلبات',
            orders: orders,
            totalSales: totalSales,
            startDate: startDate || '',
            endDate: endDate || ''
        });
    } catch (err) {
        console.error('GET /admin/orders: Error:', err.message);
        res.status(500).json({ error: 'خطأ في السيرفر', details: err.message });
    }
});

// تحديث حالة الطلب
router.post('/orders/update-status', isAuthenticated, async (req, res) => {
    console.log('POST /admin/orders/update-status: Updating order status');
    try {
        const { orderId, status } = req.body;
        console.log(`POST /admin/orders/update-status: Order ID: ${orderId}, Status: ${status}`);
        if (!['pending', 'processing', 'completed', 'cancelled'].includes(status)) {
            return res.status(400).json({ message: 'الحالة غير صالحة' });
        }
        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ message: 'الطلب غير موجود' });
        }
        res.redirect('/admin/orders');
    } catch (err) {
        console.error('POST /admin/orders/update-status: Error:', err.message);
        res.status(500).json({ error: 'خطأ في السيرفر', details: err.message });
    }
});

module.exports = router;