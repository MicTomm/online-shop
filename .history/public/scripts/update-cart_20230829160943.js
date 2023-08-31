//updateCart (<input => cart.js>)
const inputFieldUpdateNumberOfSpecificItem = document.querySelectorAll('.cart-item-management input');
const updateButtons = document.querySelectorAll('.cart-item-management button');

const itemTotalPrice = document.querySelectorAll('.cart-item-info price');
const CARTTotalPrice = document.querySelectorAll('#cart-TOTAL p');

async function updateItemQuantity(action) {
    const button = action.target;
    const productId = button.dataset.productid;
    const csrfToken = button.dataset.csrf;

    let response;

    try {
        response = await fetch('/cart/items/item/update',
            {
                method: 'POST',
                body: JSON.stringify(
                    {
                        productId: productId,
                        _csrf: csrfToken.trim()
                    }
                ),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    } catch (error) {
        console.log('ERROR - update-cart.js (scripts)');
        error.cose = 404;
        throw error;
    }

    if (!response.ok) {
        alert('Something went wrong');
        return;
    }

}

for (const updateButton of updateButtons) {
    updateButton.addEventListener('click', updateItemQuantity);
    console.log(updateButton);
}