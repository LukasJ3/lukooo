
const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');
const cartList = document.getElementById('cartList');
const products = JSON.parse(localStorage.getItem('products')) || [];
const cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayProducts() {
    productList.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Pavadinimas</th>
            <th>Kiekis</th>
            <th>Veiksmai</th>
        </tr>
    `;
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>
                <button onclick="editProduct(${product.id})">Redaguoti</button>
                <button onclick="deleteProduct(${product.id})">Ištrinti</button>
                <button onclick="addToCart(${product.id})">Į krepšelį</button>
            </td>
        `;
        productList.appendChild(row);
    });
}

function displayCart() {
    cartList.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Pavadinimas</th>
            <th>Kiekis</th>
            <th>Veiksmai</th>
        </tr>
    `;
    
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>
                <button onclick="removeFromCart(${item.id})">Pašalinti</button>
            </td>
        `;
        cartList.appendChild(row);
    });
}

productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const quantity = document.getElementById('productQuantity').value;
    
    if (!id || !name || !quantity) {
        alert('Visi laukai turi būti užpildyti!');
        return;
    }
    
    if (products.some(product => product.id === id)) {
        alert('Produktas su tokiu ID jau egzistuoja!');
        return;
    }
    
    products.push({ id, name, quantity });
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
    productForm.reset();
});

function editProduct(id) {
    const product = products.find(p => p.id === id);
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productQuantity').value = product.quantity;
    
    products.splice(products.findIndex(p => p.id === id), 1);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

function deleteProduct(id) {
    products.splice(products.findIndex(p => p.id === id), 1);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (product.quantity > 0) {
        product.quantity--;
        const cartItem = cart.find(item => item.id === id);
        
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('cart', JSON.stringify(cart));
        displayProducts();
        displayCart();
    } else {
        alert('Prekės nėra sandėlyje!');
    }
}

function removeFromCart(id) {
    const cartItem = cart.find(item => item.id === id);
    const product = products.find(p => p.id === id);
    
    if (cartItem.quantity > 1) {
        cartItem.quantity--;
    } else {
        cart.splice(cart.findIndex(item => item.id === id), 1);
    }
    
    product.quantity++;
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('cart', JSON.stringify(cart));
    displayProducts();
    displayCart();
}

displayProducts();
displayCart();
