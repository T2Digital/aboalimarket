const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const mongoose = require('mongoose');
const { isAuthenticated } = require('../middleware/auth');

// جلب منتج معين
router.get('/:id', async (req, res) => {
    try {
        console.log('جاري جلب المنتج، ID:', req.params.id);
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            console.log('الـ ID غير صالح:', req.params.id);
            return res.status(400).json({ message: 'الـ ID غير صالح' });
        }
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) {
            console.log('المنتج غير موجود:', req.params.id);
            return res.status(404).json({ message: 'المنتج غير موجود' });
        }
        console.log('تم جلب المنتج:', product);
        res.json(product);
    } catch (error) {
        console.error('خطأ في جلب المنتج:', error);
        res.status(500).json({ message: 'خطأ في جلب المنتج', error: error.message });
    }
});

// جلب منتجات حسب القسم
router.get('/category/:categoryId', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.categoryId)) {
            return res.status(400).json({ message: 'معرف القسم غير صالح' });
        }
        const products = await Product.find({ category: req.params.categoryId }).populate('category');
        console.log(`تم جلب ${products.length} منتج للقسم: ${req.params.categoryId}`);
        res.json(products);
    } catch (error) {
        console.error('خطأ في جلب المنتجات حسب القسم:', error);
        res.status(500).json({ message: 'خطأ في جلب المنتجات', error: error.message });
    }
});

// إضافة منتج
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const { name, price, image, category } = req.body;
        if (!name || !price || !image || !category) {
            return res.status(400).json({ message: 'جميع الحقول مطلوبة' });
        }
        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({ message: 'معرف القسم غير صالح' });
        }
        const product = new Product({ name, price, image, category });
        await product.save();
        console.log('تم إضافة المنتج:', product);
        res.status(201).json({ message: 'تم إضافة المنتج بنجاح', product });
    } catch (error) {
        console.error('خطأ في إضافة المنتج:', error);
        res.status(400).json({ message: 'خطأ في إضافة المنتج', error: error.message });
    }
});

// تعديل منتج
router.put('/:id', isAuthenticated, async (req, res) => {
    try {
        const { name, price, image, category } = req.body;
        if (!name || !price || !image || !category) {
            return res.status(400).json({ message: 'جميع الحقول مطلوبة' });
        }
        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({ message: 'معرف القسم غير صالح' });
        }
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, image, category },
            { new: true, runValidators: true }
        );
        if (!product) {
            console.log('المنتج غير موجود للتعديل:', req.params.id);
            return res.status(404).json({ message: 'المنتج غير موجود' });
        }
        console.log('تم تعديل المنتج:', product);
        res.json({ message: 'تم تعديل المنتج بنجاح', product });
    } catch (error) {
        console.error('خطأ في تعديل المنتج:', error);
        res.status(400).json({ message: 'خطأ في تعديل المنتج', error: error.message });
    }
});

// حذف منتج
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            console.log('المنتج غير موجود للحذف:', req.params.id);
            return res.status(404).json({ message: 'المنتج غير موجود' });
        }
        console.log('تم حذف المنتج:', req.params.id);
        res.json({ message: 'تم حذف المنتج بنجاح' });
    } catch (error) {
        console.error('خطأ في حذف المنتج:', error);
        res.status(500).json({ message: 'خطأ في حذف المنتج', error: error.message });
    }
});

module.exports = router;