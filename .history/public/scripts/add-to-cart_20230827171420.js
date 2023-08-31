const addToCartButton = document.getElementById('add-to-cart-btn');
const badge = document.querySelector('.badge');

console.log('addToCartButton:');
console.log(addToCartButton);
console.log('badge:');
console.log(badge);

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
    }

    const responseData = await response.json();
    const newTotalItems = responseData.newTotalItems;
    badge.textContent = newTotalItems;
}

addToCartButton.addEventListener('click', addToCart);