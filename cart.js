const products = [
    { name: 'C10GS -A1', region: 'APAC', esim: 'YES', formFactors: ['M.2', 'minPIC', 'LGA'], price: 50.00 },
    { name: 'C10GS -A2', region: 'APAC', esim: 'NO', formFactors: ['M.2'], price: 30.00 },
    { name: 'C10GS -A3', region: 'APAC', esim: 'NO', formFactors: ['M.2'], price: 30.00 },
    { name: 'C10GS -A4', region: 'APAC NAM', esim: 'NO', formFactors: ['M.2'], price: 30.00 },
    { name: 'C10GS -A5', region: 'APAC SAM', esim: 'NO', formFactors: ['M.2'], price: 30.00 },
    { name: 'C10GS -A6', region: 'SAM', esim: 'NO', formFactors: ['M.2'], price: 30.00 },
    { name: 'C10GS -A7', region: 'GLOBAL', esim: 'NO', formFactors: ['M.2'], price: 30.00 },
    { name: 'C10GS -A8', region: 'GLOBAL', esim: 'NO', formFactors: ['M.2'], price: 30.00 },
    { name: 'C10GS -A9', region: 'GLOBAL', esim: 'NO', formFactors: ['M.2'], price: 30.00 },
    { name: 'C10GS -A10', region: 'GLOBAL', esim: 'NO', formFactors: ['M.2'], price: 30.00 },
    { name: 'C16QS-A6', region: 'SAM EU GLOBAL', esim: 'NO', formFactors: ['LGA'], price: 40.00 }
];

document.getElementById('view-cart-btn').addEventListener('click', toggleCart);

function toggleCart() {
    const cart = document.getElementById('shopping-cart');
    cart.style.display = cart.style.display === 'none' ? 'block' : 'none';
}


function addItemToCart(productName, price) {

    const cartItems = document.getElementById('cart-items');
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${productName}</span>
        <span>$${price.toFixed(2)}</span>
        <button class="remove-btn" onclick="removeItemFromCart(this)">Remove</button>
    `;
    cartItems.appendChild(listItem);

    
    updateCartTotal(price);
}


function removeItemFromCart(button) {
    const listItem = button.parentNode;
    const priceString = listItem.querySelector('span:nth-child(2)').innerText.slice(1);
    const price = parseFloat(priceString);
    
  
    listItem.remove();


    updateCartTotal(-price);
}


function updateCartTotal(amount) {
    const cartTotal = document.getElementById('cart-total');
    const currentTotal = parseFloat(cartTotal.innerText.slice(8)); // Extract current total value
    const newTotal = currentTotal + amount;
    cartTotal.innerText = `Total: $${newTotal.toFixed(2)}`;
}


addItemToCart('Product 1', 10.99);
addItemToCart('Product 2', 15.99);


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
        addToCartButton.addEventListener('click', () => addToCart(product));

        
        productCard.appendChild(productName);
        productCard.appendChild(productDetails);
        productCard.appendChild(addToCartButton);

        
        productsContainer.appendChild(productCard);
    });
}
document.getElementById('view-cart-btn').addEventListener('click', toggleCart);

function toggleCart() {
    const cart = document.getElementById('shopping-cart');
    cart.style.display = cart.style.display === 'none' ? 'block' : 'none';
}




function applyFilters() {
    const regionFilter = document.getElementById('region-filter').value;
    const esimFilter = document.getElementById('esim-filter').value;
    const formFactorFilter = document.getElementById('form-factor-filter').value;

    const filteredProducts = products.filter(product => {
        return (
            (regionFilter === 'All' || product.region.includes(regionFilter)) &&
            (esimFilter === 'All' || (esimFilter === 'YES' && product.esim === 'YES')) &&
            (formFactorFilter === 'All' || product.formFactors.includes(formFactorFilter))
        );
    });

    renderProducts(filteredProducts);
}


function addToCart(product) {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

  
    const cartItem = document.createElement('li');
    cartItem.textContent = `${product.name} - $${product.price.toFixed(2)}`;


    cartItemsContainer.appendChild(cartItem);

    const cartTotal = parseFloat(cartTotalElement.textContent);
    cartTotalElement.textContent = (cartTotal + product.price).toFixed(2);
}


document.getElementById('region-filter').addEventListener('change', applyFilters);
document.getElementById('esim-filter').addEventListener('change', applyFilters);
document.getElementById('form-factor-filter').addEventListener('change', applyFilters);


renderProducts(products);