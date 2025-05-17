// public/admin.js
let allProducts = [];

async function displayCategories() {
    try {
        console.log('جاري جلب الأقسام');
        const response = await fetch('/api/categories', {
            cache: 'no-store',
            credentials: 'include'
        });
        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 401) {
                alert('يرجى تسجيل الدخول أولاً');
                window.location.href = '/login';
                return;
            }
            throw new Error(errorData.message || 'فشل جلب الأقسام');
        }
        const categories = await response.json();
        console.log(`تم جلب ${categories.length} قسم`);
        const categoryList = document.getElementById('category-list');
        categoryList.innerHTML = categories.map(category => `
            <div class="category-item d-flex justify-content-between align-items-center mb-2 p-2 border">
                <p class="mb-0">${category.name}</p>
                <div>
                    <button class="btn btn-warning btn-sm" onclick="showEditCategoryModal('${category._id}', '${category.name}', '${category.image}')">تعديل</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteCategory('${category._id}')">حذف</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('خطأ في جلب الأقسام:', error.message);
        alert('خطأ في جلب الأقسام: ' + error.message);
    }
}

async function displayProducts(searchTerm = '') {
    try {
        console.log('جاري جلب المنتجات');
        const response = await fetch('/api/products', {
            cache: 'no-store',
            credentials: 'include'
        });
        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 401) {
                alert('يرجى تسجيل الدخول أولاً');
                window.location.href = '/login';
                return;
            }
            throw new Error(errorData.message || 'فشل جلب المنتجات');
        }
        allProducts = await response.json();
        console.log(`تم جلب ${allProducts.length} منتج`);
        let filteredProducts = allProducts;
        if (searchTerm) {
            filteredProducts = allProducts.filter(product => 
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        const productList = document.getElementById('product-list');
        productList.innerHTML = filteredProducts.map(product => {
            const categoryId = product.category?._id || '';
            if (!product.category) {
                console.warn(`منتج بدون قسم: ${product.name}, ID: ${product._id}`);
            }
            return `
                <div class="product-item d-flex justify-content-between align-items-center mb-2 p-2 border">
                    <p class="mb-0">${product.name} - ${product.price} جنيه</p>
                    <div>
                        <button class="btn btn-warning btn-sm" onclick="showEditProductModal('${product._id}', '${product.name}', ${product.price}, '${product.image}', '${categoryId}')">تعديل</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product._id}')">حذف</button>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('خطأ في جلب المنتجات:', error.message);
        alert('خطأ في جلب المنتجات: ' + error.message);
    }
}

function showEditCategoryModal(id, name, image) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">تعديل القسم</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="edit-category-form">
                        <div class="mb-3">
                            <label for="category-name" class="form-label">اسم القسم</label>
                            <input type="text" class="form-control" id="category-name" value="${name}" required>
                        </div>
                        <div class="mb-3">
                            <label for="category-image" class="form-label">رابط الصورة</label>
                            <input type="text" class="form-control" id="category-image" value="${image}" required>
                        </div>
                        <button type="submit" class="btn btn-primary">حفظ التغييرات</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    document.getElementById('edit-category-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const updatedCategory = {
            name: document.getElementById('category-name').value,
            image: document.getElementById('category-image').value
        };
        try {
            console.log('جاري تعديل القسم، ID:', id);
            const response = await fetch(`/api/categories/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCategory),
                credentials: 'include'
            });
            const result = await response.json();
            if (!response.ok) {
                if (response.status === 401) {
                    alert('يرجى تسجيل الدخول أولاً');
                    window.location.href = '/login';
                    return;
                }
                throw new Error(result.message || 'فشل تعديل القسم');
            }
            console.log('تم تعديل القسم بنجاح:', result.category.name);
            alert(result.message);
            bsModal.hide();
            await displayCategories();
            broadcastUpdate('categories');
        } catch (error) {
            console.error('خطأ في تعديل القسم:', error.message);
            alert('خطأ في تعديل القسم: ' + error.message);
        }
    });

    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
}

async function showEditProductModal(id, name, price, image, categoryId) {
    try {
        console.log('جاري جلب الأقسام لتعديل المنتج');
        const categoriesResponse = await fetch('/api/categories', {
            cache: 'no-store',
            credentials: 'include'
        });
        if (!categoriesResponse.ok) {
            const errorData = await categoriesResponse.json();
            if (categoriesResponse.status === 401) {
                alert('يرجى تسجيل الدخول أولاً');
                window.location.href = '/login';
                return;
            }
            throw new Error(errorData.message || 'فشل جلب الأقسام');
        }
        const categories = await categoriesResponse.json();
        console.log(`تم جلب ${categories.length} قسم لتعديل المنتج`);
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">تعديل المنتج</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="edit-product-form">
                            <div class="mb-3">
                                <label for="product-name" class="form-label">اسم المنتج</label>
                                <input type="text" class="form-control" id="product-name" value="${name}" required>
                            </div>
                            <div class="mb-3">
                                <label for="product-price" class="form-label">السعر</label>
                                <input type="number" class="form-control" id="product-price" value="${price}" required>
                            </div>
                            <div class="mb-3">
                                <label for="product-image" class="form-label">رابط الصورة</label>
                                <input type="text" class="form-control" id="product-image" value="${image}" required>
                            </div>
                            <div class="mb-3">
                                <label for="product-category" class="form-label">القسم</label>
                                <select class="form-control" id="product-category" required>
                                    ${categories.map(cat => `<option value="${cat._id}" ${cat._id === categoryId ? 'selected' : ''}>${cat.name}</option>`).join('')}
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary">حفظ التغييرات</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();

        document.getElementById('edit-product-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const updatedProduct = {
                name: document.getElementById('product-name').value,
                price: document.getElementById('product-price').value,
                image: document.getElementById('product-image').value,
                category: document.getElementById('product-category').value
            };
            try {
                console.log('جاري تعديل المنتج، ID:', id);
                const response = await fetch(`/api/products/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedProduct),
                    credentials: 'include'
                });
                const result = await response.json();
                if (!response.ok) {
                    if (response.status === 401) {
                        alert('يرجى تسجيل الدخول أولاً');
                        window.location.href = '/login';
                        return;
                    }
                    throw new Error(result.message || 'فشل تعديل المنتج');
                }
                console.log('تم تعديل المنتج بنجاح:', result.product.name);
                alert(result.message);
                bsModal.hide();
                await displayProducts();
                broadcastUpdate('products');
            } catch (error) {
                console.error('خطأ في تعديل المنتج:', error.message);
                alert('خطأ في تعديل المنتج: ' + error.message);
            }
        });

        modal.addEventListener('hidden.bs.modal', () => {
            modal.remove();
        });
    } catch (error) {
        console.error('خطأ في جلب الأقسام لتعديل المنتج:', error.message);
        alert('خطأ في تحميل بيانات التعديل: ' + error.message);
    }
}

async function deleteCategory(id) {
    if (!confirm('هل أنت متأكد من حذف القسم؟')) return;
    try {
        console.log('جاري حذف القسم، ID:', id);
        const response = await fetch(`/api/categories/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        const result = await response.json();
        if (!response.ok) {
            if (response.status === 401) {
                alert('يرجى تسجيل الدخول أولاً');
                window.location.href = '/login';
                return;
            }
            throw new Error(result.message || 'فشل حذف القسم');
        }
        console.log('تم حذف القسم بنجاح');
        alert(result.message);
        await displayCategories();
        broadcastUpdate('categories');
    } catch (error) {
        console.error('خطأ في حذف القسم:', error.message);
        alert('خطأ في حذف القسم: ' + error.message);
    }
}

async function deleteProduct(id) {
    if (!confirm('هل أنت متأكد من حذف المنتج؟')) return;
    try {
        console.log('جاري حذف المنتج، ID:', id);
        const response = await fetch(`/api/products/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        const result = await response.json();
        if (!response.ok) {
            if (response.status === 401) {
                alert('يرجى تسجيل الدخول أولاً');
                window.location.href = '/login';
                return;
            }
            throw new Error(result.message || 'فشل حذف المنتج');
        }
        console.log('تم حذف المنتج بنجاح');
        alert(result.message);
        await displayProducts();
        broadcastUpdate('products');
    } catch (error) {
        console.error('خطأ في حذف المنتج:', error.message);
        alert('خطأ في حذف المنتج: ' + error.message);
    }
}

document.getElementById('product-search')?.addEventListener('input', (e) => {
    const searchTerm = e.target.value;
    displayProducts(searchTerm);
});

document.getElementById('logout-btn')?.addEventListener('click', async () => {
    try {
        console.log('جاري تسجيل الخروج');
        const response = await fetch('/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'فشل تسجيل الخروج');
        console.log('تم تسجيل الخروج بنجاح');
        alert(result.message);
        window.location.href = '/login';
    } catch (error) {
        console.error('خطأ في تسجيل الخروج:', error.message);
        alert('خطأ في تسجيل الخروج: ' + error.message);
    }
});

function broadcastUpdate(type) {
    try {
        const channel = new BroadcastChannel('store-updates');
        channel.postMessage({ type });
        channel.close();
    } catch (error) {
        console.error('خطأ في إرسال تحديث البث:', error.message);
    }
}

try {
    const channel = new BroadcastChannel('store-updates');
    channel.onmessage = (event) => {
        if (event.data.type === 'categories') {
            console.log('تحديث الأقسام بناءً على إشعار');
            displayCategories();
        } else if (event.data.type === 'products') {
            console.log('تحديث المنتجات بناءً على إشعار');
            displayProducts();
        }
    };
} catch (error) {
    console.error('خطأ في إعداد قناة البث:', error.message);
}

setInterval(async () => {
    console.log('تحديث تلقائي للأقسام والمنتجات');
    await displayCategories();
    await displayProducts();
}, 30000);

async function initializePage() {
    console.log('جاري تهيئة الصفحة');
    await displayCategories();
    await displayProducts();
}

document.addEventListener('DOMContentLoaded', initializePage);
window.addEventListener('focus', initializePage);