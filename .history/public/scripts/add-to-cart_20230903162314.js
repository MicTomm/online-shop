//addToCart (<button> => product-details.js)
const addToCartButton = document.getElementById('add-to-cart-btn');
//cart badge per desktop e mobile
const cartBadges = document.querySelectorAll('.badge');

async function addToCart(action) {

    const addToCartBtn = action.target;
    const prodId = addToCartBtn.dataset.id;
    const csrfToken = addToCartBtn.dataset.csrf;

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
    
    for (const badge of cartBadges) {
        badge.textContent = newTotalItems;
    }
}

addToCartButton.addEventListener('click', addToCart);