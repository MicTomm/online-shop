//updateCart (<input => cart.js>)
const updateCartItemForms = document.querySelectorAll('.cart-item-management form');

const itemTotalPrice = document.querySelectorAll('.cart-item-info price');
const CARTTotalPrice = document.querySelectorAll('#cart-TOTAL p');

async function updateItemQuantity(action) {
    const form = action.target;

    const productId = form.dataset.productid;
    const csrfToken = form.dataset.csrf;
    const itemTotalQuantity = form.firstElementChild.value;

    let response;

    try {
        response = await fetch('/cart/items/item/update',
            {
                method: 'PATCH',
                body: JSON.stringify(
                    {
                        productId: productId,
                        itemTotalQuantity: itemTotalQuantity,
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

for (const updateCartItemForm of updateCartItemForms) {
    updateCartItemForm.addEventListener('submit', updateItemQuantity);
    console.dir(updateCartItemForm);
}