const products = [
    { name: 'C10GS -A1', region: 'APAC', esim: 'YES', formFactors: ['M.2', 'minPIC', 'LGA'], price: 50.00 },
    { name: 'C10GS -A2', region: 'APAC', esim: 'NO', formFactors: ['M.2'], price: 30.00 },
    { name: 'C10GS -A3', region: 'APAC NAM', esim: 'YES', formFactors: ['M.2'], price: 30.00 },
    { name: 'C10GS -A4', region: 'APAC SAM', esim: 'NO', formFactors: ['M.2'], price: 30.00 },
    { name: 'C10GS -A5', region: 'SAM', esim: 'NO', formFactors: ['minPIC'], price: 30.00 },
    { name: 'C10GS -A6', region: 'GLOBAL', esim: 'NO', formFactors: ['minPIC'], price: 30.00 },
    { name: 'C10GS -A7', region: 'GLOBAL', esim: 'NO', formFactors: ['LGA'], price: 30.00 },
    { name: 'C10GS -A8', region: 'GLOBAL', esim: 'YES', formFactors: ['LGA'], price: 30.00 },
    { name: 'C10GS -A9', region: 'GLOBAL', esim: 'YES', formFactors: ['M.2', 'minPIC'], price: 30.00 },
    { name: 'C10GS -A10', region: 'NAM SAM EU GLOBAL', esim: 'YES', formFactors: ['M.2', 'minPIC', 'LGA'], price: 30.00 },
    { name: 'C16GS-A11', region: 'NAM SAM EU GLOBAL', esim: 'NO', formFactors: ['M.2'], price: 40.00 },
    { name: 'C16QM-A1', region: 'NAM SAM EU APAC', esim: 'NO', formFactors: ['M.2'], price: 40.00 },
    { name: 'C16QM-A2', region: 'NAM SAM ', esim: 'NO', formFactors: ['M.2'], price: 40.00 },
    { name: 'C16QM-A3', region: 'NAM SAM ', esim: 'NO', formFactors: ['minPIC'], price: 40.00 },
    { name: 'C16QM-A4', region: 'NAM SAM ', esim: 'NO', formFactors: ['minPIC'], price: 40.00 },
    { name: 'C16QM-A5', region: 'NAM SAM ', esim: 'NO', formFactors: ['LGA'], price: 40.00 },
    { name: 'C16QM-A6', region: 'NAM SAM ', esim: 'NO', formFactors: ['LGA'], price: 40.00 },
    { name: 'C16QM-A7', region: 'NAM SAM ', esim: 'NO', formFactors: ['M.2', 'minPIC'], price: 40.00 },
    { name: 'C16QS-A1', region: 'SAM EU GLOBAL', esim: 'NO', formFactors: ['LGA'], price: 40.00 },
    { name: 'C16QS-A2', region: 'NAM GLOBAL', esim: 'NO', formFactors: ['M.2', 'minPIC', 'LGA'], price: 40.00 },
    { name: 'C16QS-A3', region: 'NAM GLOBAL', esim: 'YES', formFactors: ['M.2', 'LGA'], price: 40.00 },
    { name: 'C16QS-A4', region: 'SAM EU GLOBAL', esim: 'YES', formFactors: ['M.2', 'minPIC'], price: 40.00 },
    { name: 'C16QS-A5', region: 'SAM EU GLOBAL', esim: 'YES', formFactors: ['M.2', 'LGA'], price: 40.00 },
    { name: 'C16QS-A6', region: 'SAM EU GLOBAL', esim: 'NO', formFactors: ['minPIC', 'LGA'], price: 40.00 },
    { name: 'C16QS-A7', region: 'NAM', esim: 'NO', formFactors: ['minPIC', 'LGA'], price: 40.00 }
];
document.getElementById('view-cart-btn').addEventListener('click', toggleCart);

function toggleCart() {
    const cart = document.getElementById('shopping-cart-container');
    document.body.classList.toggle('cart-open', cart.style.display === 'none');
}

function addToCart(product) {
   
    const cart = document.getElementById('shopping-cart-container'); 
    cart.style.display = 'block';

    updateCartAndShowDetails(product);
}




function updateCartAndShowDetails(product) {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    // Check if the product is already in the cart
    const existingCartItem = Array.from(cartItemsContainer.children).find(item =>
        item.dataset.product === product.name
    );

    if (existingCartItem) {
        // If the product is already in the cart, update its quantity
        const quantityElement = existingCartItem.querySelector('.cart-item-quantity');
        const newQuantity = parseInt(quantityElement.textContent) + 1;
        quantityElement.textContent = newQuantity;
    } else {
        // If the product is not in the cart, create a new cart item
        const cartItem = document.createElement('li');
        cartItem.dataset.product = product.name;
        cartItem.classList.add('cart-item');

        const itemName = document.createElement('span');
        itemName.textContent = `${product.name} - $${product.price.toFixed(2)}`;

        const quantityButton5 = createQuantityButton(5, product);
        const quantityButton10 = createQuantityButton(10, product);
        const removeButton = createRemoveButton(product);

        cartItem.appendChild(itemName);
        cartItem.appendChild(quantityButton5);
        cartItem.appendChild(quantityButton10);
        cartItem.appendChild(removeButton);

        cartItemsContainer.appendChild(cartItem);
    }

    // Update the total price
    const cartTotal = parseFloat(cartTotalElement.textContent);
    cartTotalElement.textContent = (cartTotal + product.price).toFixed(2);
}

function createQuantityButton(quantity, product) {
    const button = document.createElement('button');
    button.textContent = `x${quantity}`;
    button.classList.add('quantity-btn');
    button.addEventListener('click', () => addMultipleToCart(product, quantity));
    return button;
}

function createRemoveButton(product) {
    const button = document.createElement('button');
    button.textContent = 'Remove';
    button.classList.add('remove-btn');
    button.addEventListener('click', () => removeFromCart(product));
    return button;
}

function addMultipleToCart(product, quantity) {
    for (let i = 0; i < quantity; i++) {
        addToCart(product);
    }
}

function removeFromCart(product) {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    const cartItem = Array.from(cartItemsContainer.children).find(item =>
        item.dataset.product === product.name
    );

    if (cartItem) {
        // Decrease the total price
        const cartTotal = parseFloat(cartTotalElement.textContent);
        cartTotalElement.textContent = (cartTotal - product.price).toFixed(2);

        // Remove the item from the DOM
        cartItem.remove();
    }
}

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function () {
        
        const productName = this.getAttribute('data-product');
        const product = products.find(p => p.name === productName);

       
        addToCart(product);
    });
});

function renderProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const productName = document.createElement('h2');
        productName.textContent = product.name;

        const productDetails = document.createElement('p');
        productDetails.textContent = `Region: ${product.region}, eSIM: ${product.esim}, Form Factors: ${product.formFactors.join(', ')}, Price: $${product.price.toFixed(2)}`;

        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.setAttribute('data-product', product.name);
        addToCartButton.classList.add('add-to-cart-btn');
        addToCartButton.addEventListener('click', () => addToCart(product));

        productCard.appendChild(productName);
        productCard.appendChild(productDetails);
        productCard.appendChild(addToCartButton);

        productsContainer.appendChild(productCard);
    });
}

document.getElementById('region-filter').addEventListener('change', applyFilters);
document.getElementById('esim-filter').addEventListener('change', applyFilters);
document.getElementById('form-factor-filter').addEventListener('change', applyFilters);

function applyFilters() {
    const regionFilter = document.getElementById('region-filter').value;
    const esimFilter = document.getElementById('esim-filter').value.toLowerCase();
    const formFactorFilter = document.getElementById('form-factor-filter').value;

    const filteredProducts = products.filter(product => {
        return (
            (regionFilter === 'All' || product.region.includes(regionFilter)) &&
            (esimFilter === 'all' || (esimFilter === 'yes' && product.esim === 'YES') || (esimFilter === 'no' && product.esim === 'NO')) &&
            (formFactorFilter === 'All' || product.formFactors.includes(formFactorFilter))
        );
    });

    renderProducts(filteredProducts);
}

renderProducts(products);
