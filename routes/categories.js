const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Product = require('../models/Product');
const { isAuthenticated } = require('../middleware/auth');

// جلب كل الأقسام
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.error('خطأ في جلب الأقسام:', error);
        res.status(500).json({ message: 'خطأ في جلب الأقسام' });
    }
});

// إضافة قسم
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const { name, image } = req.body;
        if (!name || !image) {
            return res.status(400).json({ message: 'الاسم والصورة مطلوبان' });
        }
        const category = new Category({ name, image });
        await category.save();
        res.status(201).json({ message: 'تم إضافة القسم بنجاح', category });
    } catch (error) {
        console.error('خطأ في إضافة القسم:', error);
        res.status(400).json({ message: 'خطأ في إضافة القسم' });
    }
});

// تعديل قسم
router.put('/:id', isAuthenticated, async (req, res) => {
    try {
        const { name, image } = req.body;
        if (!name || !image) {
            return res.status(400).json({ message: 'الاسم والصورة مطلوبان' });
        }
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name, image },
            { new: true, runValidators: true }
        );
        if (!category) {
            return res.status(404).json({ message: 'القسم غير موجود' });
        }
        res.json({ message: 'تم تعديل القسم بنجاح', category });
    } catch (error) {
        console.error('خطأ في تعديل القسم:', error);
        res.status(400).json({ message: 'خطأ في تعديل القسم' });
    }
});

// حذف قسم
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'القسم غير موجود' });
        }
        const products = await Product.find({ category: req.params.id });
        if (products.length > 0) {
            return res.status(400).json({ message: 'لا يمكن حذف القسم لوجود منتجات مرتبطة' });
        }
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: 'تم حذف القسم بنجاح' });
    } catch (error) {
        console.error('خطأ في حذف القسم:', error);
        res.status(500).json({ message: 'خطأ في حذف القسم' });
    }
});

module.exports = router;