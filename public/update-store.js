// public/update-store.js
async function loadCategories() {
    try {
        console.log('جاري جلب الأقسام لنموذج المنتج');
        const response = await fetch('/api/categories', { cache: 'no-store' });
        if (!response.ok) {
            const text = await response.text();
            console.error('رد الخادم:', text);
            if (response.status === 401) {
                alert('يرجى تسجيل الدخول أولاً');
                window.location.href = '/login';
            }
            throw new Error(`فشل جلب الأقسام: ${response.status} ${response.statusText}`);
        }
        const categories = await response.json();
        const categorySelect = document.getElementById('product-category');
        categorySelect.innerHTML = '<option value="">اختر قسم</option>' + 
            categories.map(category => `
                <option value="${category._id}">${category.name}</option>
            `).join('');
        console.log(`تم جلب ${categories.length} قسم`);
    } catch (error) {
        console.error('خطأ في جلب الأقسام:', error.message);
        alert('خطأ في تحميل الأقسام: ' + error.message);
    }
}

document.getElementById('add-category-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('category-name').value;
    const image = document.getElementById('category-image').value;
    try {
        console.log('جاري إضافة قسم جديد:', { name, image });
        const response = await fetch('/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, image })
        });
        if (!response.ok) {
            const text = await response.text();
            console.error('رد الخادم:', text);
            if (response.status === 401) {
                alert('يرجى تسجيل الدخول أولاً');
                window.location.href = '/login';
            }
            throw new Error(`فشل إضافة القسم: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        console.log('تم إضافة القسم بنجاح:', result.category.name);
        alert(result.message);
        document.getElementById('add-category-form').reset();
        await loadCategories();
        broadcastUpdate('categories');
    } catch (error) {
        console.error('خطأ في إضافة القسم:', error.message);
        alert('خطأ في إضافة القسم: ' + error.message);
    }
});

document.getElementById('add-product-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const image = document.getElementById('product-image').value;
    const category = document.getElementById('product-category').value;
    try {
        console.log('جاري إضافة منتج جديد:', { name, price, image, category });
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, image, category })
        });
        if (!response.ok) {
            const text = await response.text();
            console.error('رد الخادم:', text);
            if (response.status === 401) {
                alert('يرجى تسجيل الدخول أولاً');
                window.location.href = '/login';
            }
            throw new Error(`فشل إضافة المنتج: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        console.log('تم إضافة المنتج بنجاح:', result.product.name);
        alert(result.message);
        document.getElementById('add-product-form').reset();
        broadcastUpdate('products');
    } catch (error) {
        console.error('خطأ في إضافة المنتج:', error.message);
        alert('خطأ في إضافة المنتج: ' + error.message);
    }
});

function broadcastUpdate(type) {
    const channel = new BroadcastChannel('store-updates');
    channel.postMessage({ type });
    channel.close();
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadCategories();
});