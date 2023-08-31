//addToCart (<button> => product-details.js)
const addToCartButton = document.getElementById('add-to-cart-btn');
const badge = document.querySelector('.badge');

async function addToCart(action) {

    const addToCartBtn = action.target;
    const prodId = addToCartBtn.dataset.id;
    const csrfToken = addToCartBtn.dataset.csrf;

    let response;
    try {
        response = await fetch('/items/item/update', {
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

function updateCart(){

}

addToCartButton.addEventListener('click', addToCart);