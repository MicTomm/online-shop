//updateCart (<input => cart.js>)
const updateCartItemForms = document.querySelectorAll('.cart-item-management form');

const itemTotalPrice = document.querySelectorAll('.cart-item-info price');

async function updateItemQuantity(event) {
    event.preventDefault();
    const form = event.target;

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

    const responseData = await response.json();
    const cartTotalPrice = responseData.cartTotalPrice;
    const cartTotalQuantity = responseData.cartTotalQuantity; 
    const itemTotalPrice = responseData.itemTotalPrice;
    const hasError = responseData.hasError;

    const errorMessageParagraph = document.querySelector('.cart-item-management p');
    console.log(errorMessageParagraph);
    if (hasError) {
        console.log('HAS ERROR');
        //errorMessageParagraph.style.display = "block";
    }

    if (itemTotalPrice === 0) {
        //elimino <li> cart-item
        form.parentElement.parentElement.parentElement.remove();
    } else {
        //<span><%= itemTotalPrice %></>
        form.parentElement.previousElementSibling.children[1].children[0].textContent = itemTotalPrice.toFixed(2);
    }

    const cartTotalPriceParagraph = document.querySelector('#cart-total p span');
    cartTotalPriceParagraph.textContent = cartTotalPrice.toFixed(2); 

    const badgeCarrello = document.querySelector('.badge');
    badgeCarrello.textContent = cartTotalQuantity;

}

for (const updateCartItemForm of updateCartItemForms) {
    updateCartItemForm.addEventListener('submit', updateItemQuantity);
    console.dir(updateCartItemForm);
}