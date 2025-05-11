// بيانات الأقسام
const categories = [
    { id: 1, name: 'الألبان', image: 'https://via.placeholder.com/300x150?text=الألبان' },
    { id: 2, name: 'المخبوزات', image: 'https://via.placeholder.com/300x150?text=المخبوزات' },
    { id: 3, name: 'الخضروات', image: 'https://via.placeholder.com/300x150?text=الخضروات' },
    { id: 4, name: 'الفواكه', image: 'https://via.placeholder.com/300x150?text=الفواكه' },
    { id: 5, name: 'اللحوم', image: 'https://via.placeholder.com/300x150?text=اللحوم' },
    { id: 6, name: 'المجمدات', image: 'https://via.placeholder.com/300x150?text=المجمدات' },
    { id: 7, name: 'المشروبات', image: 'https://via.placeholder.com/300x150?text=المشروبات' },
    { id: 8, name: 'المنظفات', image: 'https://via.placeholder.com/300x150?text=المنظفات' },
    { id: 9, name: 'الحلويات', image: 'https://via.placeholder.com/300x150?text=الحلويات' },
    { id: 10, name: 'المعلبات', image: 'https://via.placeholder.com/300x150?text=المعلبات' }
];

// بيانات المنتجات
const products = [
    { id: 1, categoryId: 1, name: 'حليب طازج', price: 15, image: 'https://via.placeholder.com/150?text=حليب' },
    { id: 2, categoryId: 1, name: 'جبن قريش', price: 30, image: 'https://via.placeholder.com/150?text=جبن+قريش' },
    { id: 3, categoryId: 1, name: 'زبادي طبيعي', price: 10, image: 'https://via.placeholder.com/150?text=زبادي' },
    { id: 4, categoryId: 1, name: 'جبنة شيدر', price: 50, image: 'https://via.placeholder.com/150?text=شيدر' },
    { id: 5, categoryId: 1, name: 'قشطة بلدي', price: 25, image: 'https://via.placeholder.com/150?text=قشطة' },
    { id: 6, categoryId: 2, name: 'عيش بلدي', price: 2, image: 'https://via.placeholder.com/150?text=عيش+بلدي' },
    { id: 7, categoryId: 2, name: 'كعك بالسمسم', price: 10, image: 'https://via.placeholder.com/150?text=كعك' },
    { id: 8, categoryId: 2, name: 'فينو', price: 5, image: 'https://via.placeholder.com/150?text=فينو' },
    { id: 9, categoryId: 2, name: 'بسكويت مالح', price: 15, image: 'https://via.placeholder.com/150?text=بسكويت' },
    { id: 10, categoryId: 2, name: 'كرواسون', price: 12, image: 'https://via.placeholder.com/150?text=كرواسون' },
    { id: 11, categoryId: 3, name: 'خيار', price: 5, image: 'https://via.placeholder.com/150?text=خيار' },
    { id: 12, categoryId: 3, name: 'بطاطس', price: 8, image: 'https://via.placeholder.com/150?text=بطاطس' },
    { id: 13, categoryId: 3, name: 'طماطم', price: 7, image: 'https://via.placeholder.com/150?text=طماطم' },
    { id: 14, categoryId: 3, name: 'بصل', price: 6, image: 'https://via.placeholder.com/150?text=بصل' },
    { id: 15, categoryId: 3, name: 'جزر', price: 5, image: 'https://via.placeholder.com/150?text=جزر' },
    { id: 16, categoryId: 4, name: 'موز', price: 12, image: 'https://via.placeholder.com/150?text=موز' },
    { id: 17, categoryId: 4, name: 'تفاح', price: 18, image: 'https://via.placeholder.com/150?text=تفاح' },
    { id: 18, categoryId: 4, name: 'برتقال', price: 10, image: 'https://via.placeholder.com/150?text=برتقال' },
    { id: 19, categoryId: 4, name: 'مانجو', price: 25, image: 'https://via.placeholder.com/150?text=مانجو' },
    { id: 20, categoryId: 4, name: 'عنب', price: 15, image: 'https://via.placeholder.com/150?text=عنب' },
    { id: 21, categoryId: 5, name: 'لحم بقري', price: 150, image: 'https://via.placeholder.com/150?text=لحم+بقري' },
    { id: 22, categoryId: 5, name: 'دجاج طازج', price: 60, image: 'https://via.placeholder.com/150?text=دجاج' },
    { id: 23, categoryId: 5, name: 'كبدة', price: 80, image: 'https://via.placeholder.com/150?text=كبدة' },
    { id: 24, categoryId: 5, name: 'سجق', price: 90, image: 'https://via.placeholder.com/150?text=سجق' },
    { id: 25, categoryId: 5, name: 'لحم مفروم', price: 120, image: 'https://via.placeholder.com/150?text=لحم+مفروم' },
    { id: 26, categoryId: 6, name: 'بطاطس مقلية', price: 20, image: 'https://via.placeholder.com/150?text=بطاطس+مقلية' },
    { id: 27, categoryId: 6, name: 'ناجتس دجاج', price: 35, image: 'https://via.placeholder.com/150?text=ناجتس' },
    { id: 28, categoryId: 6, name: 'سمك فيليه', price: 50, image: 'https://via.placeholder.com/150?text=سمك+فيليه' },
    { id: 29, categoryId: 6, name: 'خضار مشكل', price: 15, image: 'https://via.placeholder.com/150?text=خضار+مشكل' },
    { id: 30, categoryId: 6, name: 'بيتزا مجمدة', price: 40, image: 'https://via.placeholder.com/150?text=بيتزا' },
    { id: 31, categoryId: 7, name: 'مياه معدنية', price: 5, image: 'https://via.placeholder.com/150?text=مياه' },
    { id: 32, categoryId: 7, name: 'عصير برتقال', price: 10, image: 'https://via.placeholder.com/150?text=عصير+برتقال' },
    { id: 33, categoryId: 7, name: 'كولا', price: 8, image: 'https://via.placeholder.com/150?text=كولا' },
    { id: 34, categoryId: 7, name: 'شاي مثلج', price: 12, image: 'https://via.placeholder.com/150?text=شاي+مثلج' },
    { id: 35, categoryId: 7, name: 'لبن رايب', price: 7, image: 'https://via.placeholder.com/150?text=لبن+رايب' },
    { id: 36, categoryId: 8, name: 'مسحوق غسيل', price: 25, image: 'https://via.placeholder.com/150?text=مسحوق+غسيل' },
    { id: 37, categoryId: 8, name: 'صابون سائل', price: 15, image: 'https://via.placeholder.com/150?text=صابون+سائل' },
    { id: 38, categoryId: 8, name: 'معطر جو', price: 20, image: 'https://via.placeholder.com/150?text=معطر+جو' },
    { id: 39, categoryId: 8, name: 'مطهر أرضيات', price: 18, image: 'https://via.placeholder.com/150?text=مطهر+أرضيات' },
    { id: 40, categoryId: 8, name: 'مناديل ورقية', price: 10, image: 'https://via.placeholder.com/150?text=مناديل' },
    { id: 41, categoryId: 9, name: 'شوكولاتة', price: 15, image: 'https://via.placeholder.com/150?text=شوكولاتة' },
    { id: 42, categoryId: 9, name: 'بسكويت حلو', price: 12, image: 'https://via.placeholder.com/150?text=بسكويت+حلو' },
    { id: 43, categoryId: 9, name: 'كيك', price: 20, image: 'https://via.placeholder.com/150?text=كيك' },
    { id: 44, categoryId: 9, name: 'حلاوة طحينية', price: 18, image: 'https://via.placeholder.com/150?text=حلاوة' },
    { id: 45, categoryId: 9, name: 'مصاصات', price: 5, image: 'https://via.placeholder.com/150?text=مصاصات' },
    { id: 46, categoryId: 10, name: 'تونة', price: 20, image: 'https://via.placeholder.com/150?text=تونة' },
    { id: 47, categoryId: 10, name: 'فول مدمس', price: 10, image: 'https://via.placeholder.com/150?text=فول' },
    { id: 48, categoryId: 10, name: 'صلصة طماطم', price: 12, image: 'https://via.placeholder.com/150?text=صلصة' },
    { id: 49, categoryId: 10, name: 'مربى', price: 15, image: 'https://via.placeholder.com/150?text=مربى' },
    { id: 50, categoryId: 10, name: 'زيتون', price: 18, image: 'https://via.placeholder.com/150?text=زيتون' }
];

// السلة
let cart = [];
let currentCategoryId = null; // تتبع القسم الحالي

// عرض الأقسام
function displayCategories() {
    const categoryGrid = document.querySelector('.category-grid');
    categoryGrid.innerHTML = categories.map(category => `
        <div class="col">
            <div class="category" style="background-image: url(${category.image});" onclick="filterProducts(${category.id})">
                <h5>${category.name}</h5>
            </div>
        </div>
    `).join('');
}

// عرض المنتجات
function displayProducts(categoryId = null) {
    const productList = document.getElementById('product-list');
    currentCategoryId = categoryId; // تحديث القسم الحالي

    let filteredProducts = categoryId ? products.filter(p => p.categoryId === categoryId) : [];

    if (filteredProducts.length === 0) {
        productList.innerHTML = `
            <p class="empty-message w-100 text-center">اختار قسم لعرض المنتجات</p>
        `;
        return;
    }

    productList.innerHTML = filteredProducts.map(product => {
        const cartItem = cart.find(item => item.id === product.id);
        const quantity = cartItem ? cartItem.quantity : 0;
        const total = product.price * quantity;
        return `
            <div class="col">
                <div class="product">
                    <img src="${product.image}" alt="${product.name}">
                    <h5>${product.name}</h5>
                    <p>${product.price} جنيه</p>
                    <div class="product-actions">
                        <div class="quantity-controls">
                            <button onclick="updateQuantity(${product.id}, -1)">-</button>
                            <span>${quantity}</span>
                            <button onclick="updateQuantity(${product.id}, 1)">+</button>
                        </div>
                        <button class="btn" onclick="addToCart(${product.id})">إضافة إلى السلة</button>
                        ${quantity > 0 ? `<p class="product-total">الإجمالي: ${total} جنيه</p>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// تصفية المنتجات حسب القسم
function filterProducts(categoryId) {
    displayProducts(categoryId);
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// إغلاق قائمة الهامبرغر
function closeNavbar() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse.classList.contains('show')) {
        bootstrap.Collapse.getInstance(navbarCollapse).hide();
    }
}

// تحديث الكمية
function updateQuantity(productId, change) {
    const product = products.find(p => p.id === productId);
    let cartItem = cart.find(item => item.id === productId);

    if (!cartItem && change > 0) {
        cartItem = { id: productId, name: product.name, price: product.price, quantity: 0 };
        cart.push(cartItem);
    }

    if (cartItem) {
        cartItem.quantity = Math.max(0, cartItem.quantity + change);
        if (cartItem.quantity === 0) {
            cart = cart.filter(item => item.id !== productId);
        }
    }

    updateCart();
    displayProducts(currentCategoryId); // عرض منتجات القسم الحالي فقط
}

// إضافة إلى السلة
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    let cartItem = cart.find(item => item.id === productId);

    if (!cartItem) {
        cartItem = { id: productId, name: product.name, price: product.price, quantity: 0 };
        cart.push(cartItem);
    }

    cartItem.quantity += 1;
    updateCart();
    displayProducts(currentCategoryId); // عرض منتجات القسم الحالي فقط

    Toastify({
        text: `تمت إضافة ${product.name} إلى السلة!`,
        className: 'toast-success',
        duration: 3000,
        gravity: 'top',
        position: 'center'
    }).showToast();
}

// تحديث السلة
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>السلة فارغة</p>
                <a href="#categories" class="btn btn-shop-now">تسوق الآن</a>
            </div>
        `;
        cartCount.textContent = '0';
        cartTotal.textContent = '0';
        return;
    }

    cartItems.innerHTML = cart.map(item => {
        const total = item.price * item.quantity;
        return `
            <div class="cart-item">
                <p>${item.name} - ${item.quantity} × ${item.price} = ${total} جنيه</p>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="delete" onclick="removeFromCart(${item.id})">حذف</button>
                </div>
            </div>
        `;
    }).join('');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = total;
}

// إزالة من السلة
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    displayProducts(currentCategoryId); // عرض منتجات القسم الحالي فقط

    Toastify({
        text: 'تم حذف المنتج من السلة!',
        className: 'toast-success',
        duration: 3000,
        gravity: 'top',
        position: 'center'
    }).showToast();
}

// إظهار نموذج إتمام الطلب
function showCheckout() {
    if (cart.length === 0) {
        Toastify({
            text: 'السلة فارغة، أضف منتجات أولاً!',
            className: 'toast-error',
            duration: 3000,
            gravity: 'top',
            position: 'center'
        }).showToast();
        return;
    }

    const cartSummary = document.getElementById('cart-summary');
    const cartTotalSummary = document.getElementById('cart-total-summary');
    cartSummary.innerHTML = cart.map(item => `
        <p>${item.name} - ${item.quantity} × ${item.price} = ${item.price * item.quantity} جنيه</p>
    `).join('');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalSummary.textContent = total;

    document.getElementById('checkout-form').style.display = 'none';
    document.getElementById('electronic-payment-form').style.display = 'none';
    new bootstrap.Modal(document.getElementById('checkout')).show();
}

// إظهار نموذج الدفع عند الاستلام
function showCashForm() {
    document.getElementById('checkout-form').style.display = 'block';
    document.getElementById('electronic-payment-form').style.display = 'none';
}

// إظهار نموذج الدفع الإلكتروني
function showElectronicPaymentForm() {
    document.getElementById('checkout-form').style.display = 'none';
    document.getElementById('electronic-payment-form').style.display = 'block';
}

// الحصول على الموقع
function getLocation(inputId = 'location') {
    const statusElement = document.getElementById(`${inputId}-status`);

    // التحقق من دعم المتصفح لـ Geolocation
    if (!navigator.geolocation) {
        statusElement.textContent = 'المتصفح لا يدعم مشاركة الموقع، أدخل الرابط يدويًا';
        Toastify({
            text: 'المتصفح لا يدعم مشاركة الموقع!',
            className: 'toast-error',
            duration: 5000,
            gravity: 'top',
            position: 'center'
        }).showToast();
        return;
    }

    // التحقق من إذن الموقع (مدعوم في معظم المتصفحات الحديثة)
    if (navigator.permissions) {
        navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
            if (permissionStatus.state === 'denied') {
                statusElement.textContent = 'تم رفض إذن الموقع، يرجى تفعيله من إعدادات الجهاز';
                Toastify({
                    text: 'يرجى تفعيل الموقع من إعدادات iPhone: الإعدادات > الخصوصية > خدمات الموقع > Safari',
                    className: 'toast-error',
                    duration: 7000,
                    gravity: 'top',
                    position: 'center'
                }).showToast();
                return;
            }

            // محاولة الحصول على الموقع
            statusElement.textContent = 'جاري جلب الموقع...';
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
                    document.getElementById(inputId).value = mapsUrl;
                    statusElement.textContent = 'تم مشاركة الموقع بالألبان بنجاح!';
                    Toastify({
                        text: 'تم مشاركة الموقع بنجاح!',
                        className: 'toast-success',
                        duration: 3000,
                        gravity: 'top',
                        position: 'center'
                    }).showToast();
                },
                error => {
                    let errorMessage = 'فشل مشاركة الموقع، أدخل الرابط يدويًا';
                    if (error.code === error.PERMISSION_DENIED) {
                        errorMessage = 'تم رفض إذن الموقع، يرجى تفعيله من إعدادات iPhone';
                    } else if (error.code === error.POSITION_UNAVAILABLE) {
                        errorMessage = 'معلومات الموقع غير متوفرة، حاول مرة أخرى';
                    } else if (error.code === error.TIMEOUT) {
                        errorMessage = 'انتهت مهلة جلب الموقع، حاول مرة أخرى';
                    }
                    statusElement.textContent = errorMessage;
                    Toastify({
                        text: errorMessage,
                        className: 'toast-error',
                        duration: 7000,
                        gravity: 'top',
                        position: 'center'
                    }).showToast();
                    console.error('Geolocation error:', error);
                },
                {
                    timeout: 10000, // مهلة 10 ثوانٍ
                    maximumAge: 60000, // قبول الموقع المخزن مؤقتًا لمدة دقيقة
                    enableHighAccuracy: true // دقة عالية
                }
            );
        }).catch(err => {
            statusElement.textContent = 'فشل التحقق من إذن الموقع، أدخل الرابط يدويًا';
            console.error('Permission check error:', err);
        });
    } else {
        // إذا لم يدعم المتصفح navigator.permissions، جرب مباشرة
        statusElement.textContent = 'جاري جلب الموقع...';
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
                document.getElementById(inputId).value = mapsUrl;
                statusElement.textContent = 'تم مشاركة الموقع بنجاح!';
                Toastify({
                    text: 'تم مشاركة الموقع بنجاح!',
                    className: 'toast-success',
                    duration: 3000,
                    gravity: 'top',
                    position: 'center'
                }).showToast();
            },
            error => {
                let errorMessage = 'فشل مشاركة الموقع، أدخل الرابط يدويًا';
                if (error.code === error.PERMISSION_DENIED) {
                    errorMessage = 'تم رفض إذن الموقع، يرجى تفعيله من إعدادات iPhone';
                } else if (error.code === error.POSITION_UNAVAILABLE) {
                    errorMessage = 'معلومات الموقع غير متوفرة، حاول مرة أخرى';
                } else if (error.code === error.TIMEOUT) {
                    errorMessage = 'انتهت مهلة جلب الموقع، حاول مرة أخرى';
                }
                statusElement.textContent = errorMessage;
                Toastify({
                    text: errorMessage,
                    className: 'toast-error',
                    duration: 7000,
                    gravity: 'top',
                    position: 'center'
                }).showToast();
                console.error('Geolocation error:', error);
            },
            {
                timeout: 10000,
                maximumAge: 60000,
                enableHighAccuracy: true
            }
        );
    }
}

// إرسال الطلب (الدفع عند الاستلام)
function sendOrder(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const location = document.getElementById('location').value;

    const orderDetails = cart.map(item => `${item.name} - ${item.quantity} × ${item.price} = ${item.price * item.quantity} جنيه`).join('\n');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const message = `طلب جديد\nالاسم: ${name}\nالهاتف: ${phone}\nالعنوان: ${address}\n${location ? `الموقع: ${location}\n` : ''}تفاصيل الطلب:\n${orderDetails}\nالإجمالي: ${total} جنيه\nطريقة الدفع: عند الاستلام`;

    const whatsappUrl = `https://wa.me/+201129864940?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    Toastify({
        text: 'جارى فتح واتساب لإرسال الطلب!',
        className: 'toast-success',
        duration: 3000,
        gravity: 'top',
        position: 'center'
    }).showToast();

    cart = [];
    updateCart();
    displayProducts(currentCategoryId); // عرض منتجات القسم الحالي بعد إرسال الطلب
    bootstrap.Modal.getInstance(document.getElementById('checkout')).hide();
}

// إرسال الطلب (الدفع الإلكتروني)
async function sendElectronicOrder(event) {
    event.preventDefault();
    const name = document.getElementById('e-name').value;
    const phone = document.getElementById('e-phone').value;
    const address = document.getElementById('e-address').value;
    const location = document.getElementById('e-location').value;
    const paymentProof = document.getElementById('payment-proof').files[0];

    if (!paymentProof) {
        Toastify({
            text: 'يرجى رفع إثبات الدفع!',
            className: 'toast-error',
            duration: 3000,
            gravity: 'top',
            position: 'center'
        }).showToast();
        return;
    }

    // رفع الصورة إلى ImgBB
    const formData = new FormData();
    formData.append('image', paymentProof);
    const apiKey = 'bde613bd4475de5e00274a795091ba04';
    document.getElementById('upload-status').textContent = 'جاري رفع الصورة...';

    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();

        if (!data.success) {
            throw new Error('فشل رفع الصورة');
        }

        const imageUrl = data.data.url;
        document.getElementById('upload-status').textContent = 'تم رفع الصورة بنجاح';

        // إعداد الرسالة
        const orderDetails = cart.map(item => `${item.name} - ${item.quantity} × ${item.price} = ${item.price * item.quantity} جنيه`).join('\n');
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const message = `طلب جديد\nالاسم: ${name}\nالهاتف: ${phone}\nالعنوان: ${address}\n${location ? `الموقع: ${location}\n` : ''}تفاصيل الطلب:\n${orderDetails}\nالإجمالي: ${total} جنيه\nطريقة الدفع: إلكتروني\nإثبات الدفع: ${imageUrl}`;

        const whatsappUrl = `https://wa.me/+201129864940?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        Toastify({
            text: 'جارى فتح واتساب لإرسال الطلب!',
            className: 'toast-success',
            duration: 3000,
            gravity: 'top',
            position: 'center'
        }).showToast();

        cart = [];
        updateCart();
        displayProducts(currentCategoryId); // عرض منتجات القسم الحالي بعد إرسال الطلب
        bootstrap.Modal.getInstance(document.getElementById('checkout')).hide();
    } catch (error) {
        document.getElementById('upload-status').textContent = 'فشل رفع الصورة، حاول مرة أخرى';
        Toastify({
            text: 'حدث خطأ أثناء رفع الصورة!',
            className: 'toast-error',
            duration: 3000,
            gravity: 'top',
            position: 'center'
        }).showToast();
        console.error('Upload error:', error);
    }
}

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', () => {
    displayCategories();
    displayProducts(); // عرض الرسالة الافتراضية عند تحميل الصفحة
    updateCart();

    // إضافة حدث لأيقونة السلة
    document.querySelector('.cart-icon').addEventListener('click', () => {
        document.getElementById('cart').scrollIntoView({ behavior: 'smooth' });
        closeNavbar();
    });
});
