// بيانات الأقسام مع صور
const categories = [
    { id: 'dairy', name: 'الألبان', image: 'https://images.unsplash.com/photo-1584268431791-8e0e26df8130' },
    { id: 'bakery', name: 'المخبوزات', image: 'https://images.unsplash.com/photo-1598373182133-52427f9a9f54' },
    { id: 'drinks', name: 'المشروبات', image: 'https://images.unsplash.com/photo-1603991482957-6f2e8b7e5f0e' },
    { id: 'canned', name: 'المعلبات', image: 'https://images.unsplash.com/photo-1620052087988-6c28e058ef83' },
    { id: 'meat', name: 'اللحوم', image: 'https://images.unsplash.com/photo-1603046893744-4d4a6f14f9e7' },
    { id: 'vegetables', name: 'الخضروات', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c6f4620' },
    { id: 'fruits', name: 'الفواكه', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6' },
    { id: 'sweets', name: 'الحلويات', image: 'https://images.unsplash.com/photo-1606893995608-8c3c6534ae7e' },
    { id: 'household', name: 'مستلزمات منزلية', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
    { id: 'organic', name: 'منتجات عضوية', image: 'https://images.unsplash.com/photo-1587049352846-4a222e7844a9' },
];

// بيانات المنتجات
const products = {
    dairy: [
        { id: 1, name: 'حليب كامل الدسم', price: 20, image: 'https://images.unsplash.com/photo-1584268431791-8e0e26df8130' },
        { id: 2, name: 'جبنة شيدر', price: 50, image: 'https://images.unsplash.com/photo-1618168367622-6f8f0e7a1b6e' },
        { id: 3, name: 'زبادي طبيعي', price: 15, image: 'https://images.unsplash.com/photo-1584277594040-2b0d6c8d6b6c' },
        { id: 4, name: 'قشطة طازجة', price: 30, image: 'https://images.unsplash.com/photo-1604094014583-7f1a5a7b6f6a' },
        { id: 5, name: 'زبدة طبيعية', price: 40, image: 'https://images.unsplash.com/photo-1586861431414-0f0c89b8b0d3' },
    ],
    bakery: [
        { id: 6, name: 'خبز بلدي', price: 5, image: 'https://images.unsplash.com/photo-1598373182133-52427f9a9f54' },
        { id: 7, name: 'كرواسون', price: 15, image: 'https://images.unsplash.com/photo-1568570905206-17a2d8531f65' },
        { id: 8, name: 'توست أبيض', price: 10, image: 'https://images.unsplash.com/photo-1585238342024-78d387f4b55b' },
        { id: 9, name: 'فينو', price: 8, image: 'https://images.unsplash.com/photo-1585238341710-4d3e1f4f6b0c' },
        { id: 10, name: 'بسكويت', price: 12, image: 'https://images.unsplash.com/photo-1601001435826-4e5e9f3d7673' },
    ],
    drinks: [
        { id: 11, name: 'مياه معدنية', price: 10, image: 'https://images.unsplash.com/photo-1603991482957-6f2e8b7e5f0e' },
        { id: 12, name: 'عصير برتقال', price: 25, image: 'https://images.unsplash.com/photo-1600271886742-f049cd3d25eb' },
        { id: 13, name: 'مشروب غازي', price: 15, image: 'https://images.unsplash.com/photo-1595968446855-48e216d009ca' },
        { id: 14, name: 'شاي أخضر', price: 20, image: 'https://images.unsplash.com/photo-1623334192968-0e9b99e3c3e7' },
        { id: 15, name: 'قهوة فورية', price: 30, image: 'https://images.unsplash.com/photo-1512568400610-0f41604a9c0e' },
    ],
    canned: [
        { id: 16, name: 'تونة', price: 25, image: 'https://images.unsplash.com/photo-1620052087988-6c28e058ef83' },
        { id: 17, name: 'فول مدمس', price: 15, image: 'https://images.unsplash.com/photo-1606728035253-00b27f97d7cc' },
        { id: 18, name: 'ذرة معلبة', price: 20, image: 'https://images.unsplash.com/photo-1599496939520-c6937209f422' },
        { id: 19, name: 'مربى فراولة', price: 30, image: 'https://images.unsplash.com/photo-1587135941923-7d9b4f9e7b0f' },
        { id: 20, name: 'صلصة طماطم', price: 18, image: 'https://images.unsplash.com/photo-1599921840992-7a98d3d9f9d9' },
    ],
    meat: [
        { id: 21, name: 'لحم بقري', price: 150, image: 'https://images.unsplash.com/photo-1603046893744-4d4a6f14f9e7' },
        { id: 22, name: 'دجاج طازج', price: 80, image: 'https://images.unsplash.com/photo-1606728035253-00b27f97d7cc' },
        { id: 23, name: 'سجق', price: 60, image: 'https://images.unsplash.com/photo-1589998059171-9d6e7f99c0c0' },
        { id: 24, name: 'كبدة', price: 70, image: 'https://images.unsplash.com/photo-1606728035253-00b27f97d7cc' },
        { id: 25, name: 'سمك فيليه', price: 100, image: 'https://images.unsplash.com/photo-1625940586368-021e6f997201' },
    ],
    vegetables: [
        { id: 26, name: 'طماطم', price: 10, image: 'https://images.unsplash.com/photo-1598033129183-c4f50c6f4620' },
        { id: 27, name: 'خيار', price: 8, image: 'https://images.unsplash.com/photo-1589621316308-f2c5f2e1e3e7' },
        { id: 28, name: 'بطاطس', price: 12, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655' },
        { id: 29, name: 'بصل', price: 7, image: 'https://images.unsplash.com/photo-1587049352846-4a222e7844a9' },
        { id: 30, name: 'جزر', price: 9, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37' },
    ],
    fruits: [
        { id: 31, name: 'تفاح', price: 20, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6' },
        { id: 32, name: 'موز', price: 15, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c0b174e' },
        { id: 33, name: 'برتقال', price: 18, image: 'https://images.unsplash.com/photo-1547517023-7ca0c162f816' },
        { id: 34, name: 'فراولة', price: 30, image: 'https://images.unsplash.com/photo-1518639192441-9b3b4e0c6e4e' },
        { id: 35, name: 'مانجو', price: 25, image: 'https://images.unsplash.com/photo-1601493700631-2b25e1842d2a' },
    ],
    sweets: [
        { id: 36, name: 'شوكولاتة', price: 20, image: 'https://images.unsplash.com/photo-1606893995608-8c3c6534ae7e' },
        { id: 37, name: 'كعك', price: 15, image: 'https://images.unsplash.com/photo-1563729786-3f03b7e0a9a0' },
        { id: 38, name: 'بسكويت شوكولاتة', price: 18, image: 'https://images.unsplash.com/photo-1601001435826-4e5e9f3d7673' },
        { id: 39, name: 'حلاوة طحينية', price: 25, image: 'https://images.unsplash.com/photo-1606728035253-00b27f97d7cc' },
        { id: 40, name: 'آيس كريم', price: 30, image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a4f3' },
    ],
    household: [
        { id: 41, name: 'منظف أرضيات', price: 25, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
        { id: 42, name: 'صابون سائل', price: 20, image: 'https://images.unsplash.com/photo-1584302179602-77b53c1daffd' },
        { id: 43, name: 'مناديل ورقية', price: 15, image: 'https://images.unsplash.com/photo-1592931594665-8797d7165108' },
        { id: 44, name: 'معطر جو', price: 30, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
        { id: 45, name: 'أكياس نفايات', price: 10, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
    ],
    organic: [
        { id: 46, name: 'عسل طبيعي', price: 50, image: 'https://images.unsplash.com/photo-1587049352846-4a222e7844a9' },
        { id: 47, name: 'زيت زيتون', price: 60, image: 'https://images.unsplash.com/photo-1587905069134-8a9d2f8a9b37' },
        { id: 48, name: 'أرز بني', price: 30, image: 'https://images.unsplash.com/photo-1586201375761-83865001e8c5' },
        { id: 49, name: 'شوفان عضوي', price: 25, image: 'https://images.unsplash.com/photo-1606728035253-00b27f97d7cc' },
        { id: 50, name: 'مكسرات', price: 40, image: 'https://images.unsplash.com/photo-1606728035253-00b27f97d7cc' },
    ],
};

// تحميل السلة من LocalStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// عدادات الكمية لكل منتج
let productQuantities = {};

// عرض الأقسام
function loadCategories() {
    const categoryGrid = document.querySelector('.category-grid');
    categoryGrid.innerHTML = '';
    categories.forEach(category => {
        categoryGrid.innerHTML += `
            <div class="category" style="background-image: url('${category.image}')" onclick="showProducts('${category.id}')">
                <h5>${category.name}</h5>
            </div>
        `;
    });
}

// عرض المنتجات مع عداد الكمية والإجمالي
function showProducts(category) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products[category].forEach(product => {
        const quantity = productQuantities[product.id] || 0;
        const total = product.price * quantity;
        productList.innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h5>${product.name}</h5>
                <p>${product.price} جنيه</p>
                <div class="product-actions">
                    <div class="quantity-controls">
                        <button onclick="updateProductQuantity(${product.id}, -1, ${product.price})">-</button>
                        <span id="quantity-${product.id}">${quantity}</span>
                        <button onclick="updateProductQuantity(${product.id}, 1, ${product.price})">+</button>
                    </div>
                    <button class="btn" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">إضافة إلى السلة</button>
                </div>
                <p class="product-total">الإجمالي: <span id="total-${product.id}">${total}</span> جنيه</p>
            </div>
        `;
    });
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    console.log(`Analytics: Viewed category ${category}`);
}

// تحديث كمية المنتج في بطاقة المنتج
function updateProductQuantity(id, change, price) {
    productQuantities[id] = (productQuantities[id] || 0) + change;
    if (productQuantities[id] < 0) productQuantities[id] = 0;
    document.getElementById(`quantity-${id}`).textContent = productQuantities[id];
    document.getElementById(`total-${id}`).textContent = (productQuantities[id] * price).toFixed(2);
}

// إضافة إلى السلة
function addToCart(id, name, price) {
    const quantity = productQuantities[id] || 0;
    if (quantity <= 0) {
        alert('يرجى تحديد كمية أكبر من 0');
        return;
    }
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({ id, name, price, quantity });
    }
    productQuantities[id] = 0;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    updateProductQuantity(id, 0, price);
    alert(`${name} تمت إضافته إلى السلة!`);
    console.log(`Analytics: Added product ${name} to cart`);
}

// تحديث السلة
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    cartItems.innerHTML = cart.length === 0
        ? `<div class="empty-cart"><p>السلة فارغة، ابدأ التسوق الآن!</p><a href="#categories">تسوق الآن</a></div>`
        : '';
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        cartItems.innerHTML += `
            <div class="cart-item">
                <p>${item.name} (x${item.quantity}) - ${itemTotal.toFixed(2)} جنيه</p>
                <div class="quantity-controls">
                    <button onclick="updateCartQuantity(${item.id}, -1)">-</button>
                    <button onclick="updateCartQuantity(${item.id}, 1)">+</button>
                    <button class="delete" onclick="removeFromCart(${item.id})">حذف</button>
                </div>
            </div>
        `;
        total += itemTotal;
    });
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartSummary();
}

// تحديث كمية في السلة
function updateCartQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        updateCart();
        console.log(`Analytics: Updated quantity for product ID ${id} to ${item ? item.quantity : 0}`);
    }
}

// حذف من السلة
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
    console.log(`Analytics: Removed product ID ${id} from cart`);
}

// تحديث ملخص السلة في نموذج الطلب
function updateCartSummary() {
    const cartSummary = document.getElementById('cart-summary');
    const cartTotalSummary = document.getElementById('cart-total-summary');
    cartSummary.innerHTML = cart.length === 0 ? '<p>السلة فارغة</p>' : '';
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        cartSummary.innerHTML += `
            <div class="d-flex justify-content-between">
                <span>${item.name} (x${item.quantity})</span>
                <span>${itemTotal.toFixed(2)} جنيه</span>
            </div>
        `;
        total += itemTotal;
    });
    cartTotalSummary.textContent = total.toFixed(2);
}

// إظهار نموذج الطلب
function showCheckout() {
    if (cart.length === 0) {
        alert('السلة فارغة! أضف بعض المنتجات أولاً.');
        return;
    }
    updateCartSummary();
    const checkoutModal = new bootstrap.Modal(document.getElementById('checkout'), {
        keyboard: false
    });
    checkoutModal.show();
    console.log('Analytics: Viewed checkout page');
}

// مشاركة الموقع باستخدام الكود الشغال مع تحسينات
function getLocation() {
    const locationBtn = document.getElementById("locationBtn");
    const locationInput = document.getElementById("location");
    const locationStatus = document.getElementById("location-status");

    // التحقق من HTTPS
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        locationStatus.textContent = 'يتطلب تحديد الموقع HTTPS. يرجى رفع الموقع على خادم آمن.';
        alert('خطأ: تحديد الموقع يتطلب HTTPS.\nإرشادات:\n1. ارفع الموقع على Netlify أو Hostinger مع HTTPS.\n2. أو أدخل رابط Google Maps يدويًا.');
        console.error('Analytics: Geolocation requires HTTPS');
        return;
    }

    // تعطيل الزر أثناء الجلب
    locationBtn.disabled = true;
    locationBtn.textContent = 'جارٍ جلب الموقع...';
    locationStatus.textContent = 'جارٍ جلب الموقع...';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                let locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
                locationInput.value = locationUrl;
                locationStatus.textContent = '✅ تم تحديد الموقع بنجاح';
                locationBtn.textContent = '✅ تم تحديد الموقع';
                locationBtn.classList.remove('btn-primary');
                locationBtn.classList.add('btn-success');
                locationBtn.disabled = false;
                console.log(`Analytics: Location shared - Lat: ${latitude}, Lon: ${longitude}`);
            },
            function(error) {
                let errorMessage = '';
                let alertMessage = '';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'تم رفض إذن الموقع. يرجى تفعيله في إعدادات المتصفح.';
                        alertMessage = 'إذن الموقع مرفوض.\nإرشادات:\n1. افتح إعدادات المتصفح.\n2. ابحث عن "الموقع" أو "Location".\n3. اسمح للموقع بالوصول.\n4. أو أدخل رابط Google Maps يدويًا.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'الموقع غير متوفر. تأكد من تفعيل GPS.';
                        alertMessage = 'الموقع غير متوفر.\nإرشادات:\n1. تأكد من تفعيل GPS على جهازك.\n2. تحقق من اتصال الإنترنت.\n3. أدخل رابط Google Maps يدويًا.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'انتهت مهلة الطلب. حاول مرة أخرى.';
                        alertMessage = 'انتهت مهلة جلب الموقع.\nإرشادات:\n1. حاول مرة أخرى.\n2. تأكد من اتصال الإنترنت.\n3. أدخل رابط Google Maps يدويًا.';
                        break;
                    default:
                        errorMessage = 'حدث خطأ غير معروف. يرجى إدخال رابط Google Maps يدويًا.';
                        alertMessage = 'خطأ غير معروف.\nإرشادات:\n1. حاول مرة أخرى.\n2. أدخل رابط Google Maps يدويًا.';
                        break;
                }
                locationStatus.textContent = errorMessage;
                alert(alertMessage);
                locationBtn.textContent = 'إعادة المحاولة';
                locationBtn.disabled = false;
                console.error(`Analytics: Location error - Code: ${error.code}, Message: ${error.message}`);
            },
            {
                enableHighAccuracy: true, // دقة عالية
                timeout: 10000, // مهلة 10 ثوانٍ
                maximumAge: 0 // عدم استخدام بيانات مخزنة
            }
        );
    } else {
        locationStatus.textContent = 'المتصفح لا يدعم تحديد الموقع. يرجى إدخال رابط Google Maps يدويًا.';
        alert('المتصفح لا يدعم تحديد الموقع.\nإرشادات:\n1. استخدم متصفحًا آخر مثل Chrome.\n2. أدخل رابط Google Maps يدويًا.');
        locationBtn.textContent = 'مشاركة الموقع';
        locationBtn.disabled = false;
        console.error('Analytics: Geolocation not supported');
    }
}

// إرسال الطلب إلى واتساب
function sendOrder(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const location = document.getElementById('location').value || 'لم يتم مشاركة رابط الموقع';

    if (!name || !phone || !address) {
        alert('يرجى ملء جميع الحقول الإلزامية (الاسم، الهاتف، العنوان)');
        return;
    }

    let orderDetails = `طلب جديد من ${name}\nرقم الهاتف: ${phone}\nالعنوان: ${address}\nرابط الموقع: ${location}\n\nالمنتجات:\n`;
    cart.forEach(item => {
        orderDetails += `${item.name} (x${item.quantity}) - ${(item.price * item.quantity).toFixed(2)} جنيه\n`;
    });
    orderDetails += `الإجمالي: ${document.getElementById('cart-total').textContent} جنيه`;

    const whatsappUrl = `https://wa.me/201129864940?text=${encodeURIComponent(orderDetails)}`;
    window.open(whatsappUrl, '_blank');
    bootstrap.Modal.getInstance(document.getElementById('checkout')).hide();
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    alert('تم إرسال الطلب بنجاح!');
    console.log('Analytics: Order submitted');
}

// تحميل الأقسام والسلة عند بدء التشغيل
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    updateCart();
    console.log('Analytics: Page loaded');
});