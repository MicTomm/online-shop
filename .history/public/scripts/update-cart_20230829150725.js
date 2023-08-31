//updateCart (<input => cart.js>)
const inputFieldUpdateNumberOfSpecificItem = document.querySelectorAll('.cart-item-management input');
const updateButtons = document.querySelectorAll('.cart-item-management button');

function updateItemQuantity() {

}

for (const updateButton of updateButtons) {
    updateButton.addEventListener('click', updateItemQuantity);
}