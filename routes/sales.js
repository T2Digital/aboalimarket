const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const moment = require('moment');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, async (req, res) => {
    try {
        console.log('جلب المبيعات: بدء العملية');
        const { startDate, endDate } = req.query;
        let query = { status: { $ne: 'cancelled' } };
        if (startDate && endDate) {
            query.createdAt = {
                $gte: moment(startDate).startOf('day').toDate(),
                $lte: moment(endDate).endOf('day').toDate()
            };
        }
        console.log('Query المستخدمة:', query);
        const orders = await Order.find(query).populate({
            path: 'products.product',
            model: 'Product'
        });
        console.log(`جلب المبيعات: تم جلب ${orders.length} طلب`);
        const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
        const totalOrders = orders.length;
        res.render('sales', {
            title: 'إحصائيات المبيعات',
            orders,
            totalSales,
            totalOrders,
            startDate: startDate || '',
            endDate: endDate || ''
        });
    } catch (err) {
        console.error('خطأ في جلب الإحصائيات:', err.message);
        res.status(500).send('خطأ في جلب الإحصائيات');
    }
});

router.get('/sales-data', isAuthenticated, async (req, res) => {
    try {
        const { period } = req.query;
        let query = { status: { $ne: 'cancelled' } };
        const now = moment();
        if (period === 'today') {
            query.createdAt = {
                $gte: now.startOf('day').toDate(),
                $lte: now.endOf('day').toDate()
            };
        } else if (period === 'yesterday') {
            query.createdAt = {
                $gte: now.subtract(1, 'days').startOf('day').toDate(),
                $lte: now.endOf('day').toDate()
            };
        } else if (period === 'week') {
            query.createdAt = {
                $gte: now.startOf('week').toDate(),
                $lte: now.endOf('week').toDate()
            };
        } else if (period === 'month') {
            query.createdAt = {
                $gte: now.startOf('month').toDate(),
                $lte: now.endOf('month').toDate()
            };
        } else if (period === 'year') {
            query.createdAt = {
                $gte: now.startOf('year').toDate(),
                $lte: now.endOf('year').toDate()
            };
        }
        console.log('جلب بيانات المبيعات، الفترة:', period, 'Query:', query);
        const orders = await Order.find(query);
        const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
        console.log(`جلب بيانات المبيعات: إجمالي المبيعات ${totalSales}`);
        res.json({ totalSales });
    } catch (err) {
        console.error('خطأ في جلب بيانات المبيعات:', err.message);
        res.status(500).json({ message: 'خطأ في جلب بيانات المبيعات', error: err.message });
    }
});

module.exports = router;