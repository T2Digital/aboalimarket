const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, async (req, res) => {
    try {
        console.log('جلب الطلبات لصفحة الإدارة: بدء العملية');
        const orders = await Order.find().populate({
            path: 'products.product',
            model: 'Product'
        });
        console.log(`جلب الطلبات: تم جلب ${orders.length} طلب`);
        const totalSales = await Order.aggregate([
            { $match: { status: { $ne: 'cancelled' } } },
            { $group: { _id: null, total: { $sum: '$total' } } }
        ]);
        const total = totalSales.length > 0 ? totalSales[0].total : 0;
        res.render('orders', { title: 'متابعة الطلبات', orders, totalSales: total });
    } catch (err) {
        console.error('خطأ في جلب الطلبات:', err.message);
        res.status(500).send('خطأ في جلب الطلبات');
    }
});

router.post('/update-status', isAuthenticated, async (req, res) => {
    try {
        const { orderId, status } = req.body;
        console.log(`تحديث حالة الطلب، ID: ${orderId}, الحالة: ${status}`);
        if (!['pending', 'processing', 'completed', 'cancelled'].includes(status)) {
            console.log('خطأ: الحالة غير صالحة');
            return res.status(400).json({ message: 'الحالة غير صالحة' });
        }
        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        if (!order) {
            console.log(`خطأ: الطلب غير موجود، ID: ${orderId}`);
            return res.status(404).json({ message: 'الطلب غير موجود' });
        }
        console.log(`تم تحديث الطلب: ${orderId}`);
        res.redirect('/admin/orders');
    } catch (err) {
        console.error('خطأ في تحديث حالة الطلب:', err.message);
        res.status(500).json({ message: 'خطأ في تحديث الحالة', error: err.message });
    }
});

module.exports = router;