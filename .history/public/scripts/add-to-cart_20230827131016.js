const addToCartButton = document.getElementById('add-to-cart-btn');

async function addToCart(action)

const button = action.target;

{
    await fetch(`/cart/${}`, {
        method: POST
    });
}

addToCartButton.addEventListener('click', addToCart);