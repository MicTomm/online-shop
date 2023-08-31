const addToCartButton = document.getElementById('add-to-cart-btn');
const badge = document.querySelector('.badge');

console.log('addToCartButton:');
console.log(addToCartButton);
console.log('badge:');
console.log(badge);

async function showBadgeValue (){
    
    const response = await fetch('/cart/items/counter');

    if (!response.ok) {
        console.log('ERROR - add-to-cart-js -> showBadgeValue');
        alert('Something went wrong');
        return;
    }

    const respData = response.json();
    const totItems = respData.newTotalItems;
    badge.textContent = totItems;
}

async function addToCart(action) {

    const addToCartBtn = action.target;
    const prodId = addToCartBtn.dataset.id;
    const csrfToken = addToCartBtn.dataset.csrf;
    console.log('PROD_ID: ' + prodId);
    console.log('CSRF_TOKEN: ' + csrfToken);

    let response;
    try {
        response = await fetch('/cart/items', {
            method: 'POST',
            body: JSON.stringify(
                {
                    productId: prodId,
                    _csrf: csrfToken
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log('ERROR - add-to-cart.js (scripts)');
        error.cose = 404;
        throw error;
    }

    if (!response.ok) {
        alert('Something went wrong');
        return;
    }
    
    const responseData = await response.json(); //riconverte da json in js
    const newTotalItems = responseData.newTotalItems;
    badge.textContent = newTotalItems;
}

badge.addEventListener('load', showBadgeValue);

addToCartButton.addEventListener('click', addToCart);