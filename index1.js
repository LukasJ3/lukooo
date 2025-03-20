class ProductManager {
    constructor() {
        this.products = JSON.parse(localStorage.getItem('products')) || [];
        this.form = document.getElementById('productForm');
        this.productList = document.getElementById('productList');
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.displayProducts();
    }

    handleSubmit(e) {
        e.preventDefault();
        const id = document.getElementById('productId').value.trim();
        const name = document.getElementById('productName').value.trim();
        const quantity = document.getElementById('productQuantity').value.trim();

        if (!id || !name || !quantity) {
            alert('Užpildykite visus laukus!');
            return;
        }

        const product = { id, name, quantity: parseInt(quantity) };
        this.products.push(product);
        localStorage.setItem('products', JSON.stringify(this.products));
        this.displayProducts();
        this.form.reset();
    }

    displayProducts() {
        this.productList.innerHTML = '';
        this.products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>
                    <button onclick="productManager.deleteProduct('${product.id}')">Ištrinti</button>
                     <button onclick="productManager.addToCart('${product.id}')">Į krepšelį</button>
                     
                </td>
            `;
            this.productList.appendChild(row);
        });
    }

    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        localStorage.setItem('products', JSON.stringify(this.products));
        this.displayProducts();
    }

    addToCart(id) {
        const product = this.products.find(p => p.id === id);
        if (product && product.quantity > 0) {
            product.quantity--;
            localStorage.setItem('products', JSON.stringify(this.products));
            this.displayProducts();
            
            const cartItems = document.getElementById('cartItems');
            const cartItem = document.createElement('div');
            cartItem.textContent = product.name;
            cartItems.appendChild(cartItem);
        }
    }


        }
    
const productManager = new ProductManager();