document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("checkout-btn");
    
    
    const products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 19.99 },
        { id: 3, name: "Product 3", price: 59.999 },
    ];

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach(p => renderCart(p));

    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>`;
        productList.appendChild(productDiv);
    });

    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find((p) => p.id === productId);
            addToCart(product);
        }
    });

    function addToCart(product) {
        cart.push(product);
        saveTasks();
        renderCart();
    }

    function renderCart() {
        cartItems.innerText = "";
        let totalPrice = 0;
        
        // console.log(cartItems);
        if(cart.length > 0) {
            emptyCartMessage.classList.add("hidden");
            cartTotalMessage.classList.remove("hidden");
            cart.forEach((item, index) => {
                totalPrice += item.price;
                const cartItem = document.createElement("div");
                cartItem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
                <button data-index="${index}">Remove</button>
                `;
                cartItems.appendChild(cartItem);
            });
            totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
        }
        else {
            emptyCartMessage.classList.remove("hidden");
            cartTotalMessage.classList.add("hidden");
            totalPriceDisplay.textContent = `${0.00}`;
        }
    }

    // here implement the feature Of "REMOVE" button in cardList
    cartItems.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON') {
            e.stopPropagation();
            const dataIndex = parseInt(e.target.getAttribute('data-index'));
            cart.splice(dataIndex, 1);
            saveTasks();
            renderCart();
        }
    });


    checkOutBtn.addEventListener("click", () => {
        cart.length = 0;
        saveTasks();
        alert("Checkout successfully");
        renderCart();
    });
    
    
  // now here we move the cart to local storage
    function saveTasks() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    

    // as DOM loaded it render the local Storage
    renderCart();
    
});
