//updateCart (<input => cart.js>)
const inputFieldUpdateNumberOfSpecificItem = document.querySelectorAll('.cart-item-management input');
const updateButtons = document.querySelectorAll('.cart-item-management button');

function updateItemQuantity(action) {
    const button = action.target;
    const productId = button.dataset.product-id;    
    const csrfToken = button.dataset.csrf;
    
    console.log('UPDATE_CART => productId: ' + productId); 
    console.log('UPDATE_CART => csrfToken: ' + csrfToken); 
}

for (const updateButton of updateButtons) {
    updateButton.addEventListener('click', updateItemQuantity);
    console.log(updateButton);
}