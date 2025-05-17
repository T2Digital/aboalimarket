const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Product = require('../models/Product');
const Order = require('../models/Order');
const mongoose = require('mongoose');
const axios = require('axios');
const FormData = require('form-data');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { isAuthenticated } = require('../middleware/auth');

// إنشاء الطلبات
router.post('/orders', upload.single('paymentProof'), async (req, res) => {
    try {
        console.log('Received request body:', req.body);
        console.log('Received file:', req.file);

        let customerName, customerPhone, customerAddress, customerLocation, products, total, paymentMethod;
        let paymentProofUrl = '';

        if (req.body.paymentMethod === 'electronic') {
            if (!req.file) {
                console.log('No payment proof provided');
                return res.status(400).json({ success: false, error: 'إثبات الدفع مطلوب' });
            }

            customerName = req.body.customerName;
            customerPhone = req.body.customerPhone;
            customerAddress = req.body.customerAddress;
            customerLocation = req.body.customerLocation || '';
            products = req.body.products ? JSON.parse(req.body.products) : null;
            total = req.body.total ? parseFloat(req.body.total) : null;
            paymentMethod = req.body.paymentMethod;

            console.log('Extracted FormData:', {
                customerName,
                customerPhone,
                customerAddress,
                customerLocation,
                products,
                total,
                paymentMethod
            });

            if (!customerName || !customerPhone || !customerAddress || !products || !total || !paymentMethod) {
                console.log('Missing required fields');
                return res.status(400).json({ success: false, error: 'جميع الحقول مطلوبة' });
            }

            const formData = new FormData();
            formData.append('image', req.file.buffer, req.file.originalname);
            console.log('Uploading to ImgBB...');
            try {
                const imgbbResponse = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
                    formData,
                    {
                        headers: formData.getHeaders(),
                        timeout: 30000
                    }
                );
                paymentProofUrl = imgbbResponse.data.data.url;
                console.log('ImgBB upload successful:', paymentProofUrl);
            } catch (imgbbError) {
                console.error('ImgBB upload failed:', imgbbError.message);
                return res.status(500).json({ success: false, error: 'فشل رفع الصورة إلى ImgBB', details: imgbbError.message });
            }
        } else {
            ({ customerName, customerPhone, customerAddress, customerLocation, products, total, paymentMethod } = req.body);

            if (!customerName || !customerPhone || !customerAddress || !products || !total || !paymentMethod) {
                console.log('Missing required fields for cash payment');
                return res.status(400).json({ success: false, error: 'جميع الحقول مطلوبة' });
            }
        }

        const populatedProducts = await Promise.all(products.map(async (p) => {
            const product = await Product.findById(p.product);
            return { ...p, name: product ? product.name : 'منتج غير معروف' };
        }));

        let locationLink = '';
        if (customerLocation) {
            console.log('customerLocation provided:', customerLocation);
            if (customerLocation.startsWith('http')) {
                locationLink = customerLocation;
            } else {
                locationLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(customerLocation)}`;
            }
        } else {
            console.warn('customerLocation غير موجود، استخدام customerAddress كبديل');
            locationLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(customerAddress)}`;
        }

        const order = new Order({
            customerName,
            customerPhone,
            customerAddress,
            customerLocation: locationLink,
            products,
            total,
            paymentMethod,
            paymentProof: paymentProofUrl,
            status: 'pending'
        });
        await order.save();
        console.log('Order saved:', order._id);

        const message = `طلب جديد من ${customerName}\n` +
                       `العنوان: ${customerAddress}\n` +
                       `الموقع: ${locationLink}\n` +
                       `الهاتف: ${customerPhone}\n` +
                       `الإجمالي: ${total} جنيه\n` +
                       `طريقة الدفع: ${paymentMethod === 'cash' ? 'عند الاستلام' : 'إلكتروني'}\n` +
                       `المنتجات:\n${populatedProducts.map(p => `${p.quantity} × ${p.name}`).join('\n')}` +
                       (paymentProofUrl ? `\nإثبات الدفع: ${paymentProofUrl}` : '');
        const whatsappUrl = `https://wa.me/${process.env.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        console.log('WhatsApp URL generated:', whatsappUrl);

        res.json({ success: true, orderId: order._id, whatsappUrl });
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({ success: false, error: 'خطأ في إنشاء الطلب', details: err.message });
    }
});

// جلب إحصائيات المبيعات
router.get('/sales', async (req, res) => {
    try {
        const { startDate, endDate, period } = req.query;
        let query = {};

        if (startDate && endDate) {
            query.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999))
            };
        } else if (period) {
            const now = new Date();
            switch (period) {
                case 'today':
                    query.createdAt = {
                        $gte: new Date(now.setHours(0, 0, 0, 0)),
                        $lte: new Date(now.setHours(23, 59, 59, 999))
                    };
                    break;
                case 'yesterday':
                    const yesterday = new Date(now.setDate(now.getDate() - 1));
                    query.createdAt = {
                        $gte: new Date(yesterday.setHours(0, 0, 0, 0)),
                        $lte: new Date(yesterday.setHours(23, 59, 59, 999))
                    };
                    break;
                case 'week':
                    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
                    query.createdAt = {
                        $gte: new Date(weekStart.setHours(0, 0, 0, 0)),
                        $lte: new Date()
                    };
                    break;
                case 'month':
                    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
                    query.createdAt = {
                        $gte: new Date(monthStart.setHours(0, 0, 0, 0)),
                        $lte: new Date()
                    };
                    break;
                case 'year':
                    const yearStart = new Date(now.getFullYear(), 0, 1);
                    query.createdAt = {
                        $gte: new Date(yearStart.setHours(0, 0, 0, 0)),
                        $lte: new Date()
                    };
                    break;
                case 'all':
                default:
                    // لا قيود على التاريخ
                    break;
            }
        }

        const orders = await Order.find(query).populate('products.product');
        const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
        const totalOrders = orders.length;

        res.json({ totalSales, totalOrders, orders });
    } catch (error) {
        console.error('خطأ في جلب الإحصائيات:', error);
        res.status(500).json({ message: 'خطأ في جلب الإحصائيات', error: error.message });
    }
});

// جلب الطلبات
router.get('/orders', async (req, res) => {
    try {
        const { period } = req.query;
        let query = {};

        if (period && period !== 'all') {
            const now = new Date();
            switch (period) {
                case 'today':
                    query.createdAt = {
                        $gte: new Date(now.setHours(0, 0, 0, 0)),
                        $lte: new Date(now.setHours(23, 59, 59, 999))
                    };
                    break;
                case 'yesterday':
                    const yesterday = new Date(now.setDate(now.getDate() - 1));
                    query.createdAt = {
                        $gte: new Date(yesterday.setHours(0, 0, 0, 0)),
                        $lte: new Date(yesterday.setHours(23, 59, 59, 999))
                    };
                    break;
                case 'week':
                    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
                    query.createdAt = {
                        $gte: new Date(weekStart.setHours(0, 0, 0, 0)),
                        $lte: new Date()
                    };
                    break;
                case 'month':
                    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
                    query.createdAt = {
                        $gte: new Date(monthStart.setHours(0, 0, 0, 0)),
                        $lte: new Date()
                    };
                    break;
                case 'year':
                    const yearStart = new Date(now.getFullYear(), 0, 1);
                    query.createdAt = {
                        $gte: new Date(yearStart.setHours(0, 0, 0, 0)),
                        $lte: new Date()
                    };
                    break;
                default:
                    // لا قيود
                    break;
            }
        }

        const orders = await Order.find(query).populate('products.product');
        const totalSales = orders.reduce((sum, order) => sum + order.total, 0);

        res.json({ orders, totalSales });
    } catch (error) {
        console.error('خطأ في جلب الطلبات:', error);
        res.status(500).json({ message: 'خطأ في جلب الطلبات', error: error.message });
    }
});

// البحث عن المنتجات
router.get('/products', async (req, res) => {
    try {
        const searchQuery = req.query.search || '';
        console.log(`جلب المنتجات مع البحث: ${searchQuery}`);
        const query = searchQuery ? { name: { $regex: searchQuery, $options: 'i' } } : {};
        const products = await Product.find(query).populate('category');
        console.log(`تم جلب ${products.length} منتج`);
        res.json(products);
    } catch (error) {
        console.error('خطأ في جلب المنتجات:', error);
        res.status(500).json({ message: 'خطأ في جلب المنتجات', error: error.message });
    }
});

// إدارة الأقسام والمنتجات
router.use('/categories', require('./categories'));
router.use('/products', require('./products'));

module.exports = router;