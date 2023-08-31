//updateCart (<input => cart.js>)
const inputFieldUpdateNumberOfSpecificItem = document.querySelectorAll('.cart-item-management input');
const updateButtons = document.querySelectorAll('.cart-item-management button');

async function updateItemQuantity(action) {
    const button = action.target;
    const productId = button.dataset.productid;    
    const csrfToken = button.dataset.csrf;
  
    await fetch('',
    {
        method: 'POST',
        body: JSON.stringify(
            {
                productId: productId,
                csrfToken: csrfToken
            }
        ),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

for (const updateButton of updateButtons) {
    updateButton.addEventListener('click', updateItemQuantity);
    console.log(updateButton);
}