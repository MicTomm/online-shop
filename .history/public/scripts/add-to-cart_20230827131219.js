const addToCartButton = document.getElementById('add-to-cart-btn');

async function addToCart(action)

const addToCartBtn = action.target;
const prodId = addToCartBtn.dataset.id;

{
    await fetch(`/cart/${}`, {
        method: POST
    });
}

addToCartButton.addEventListener('click', addToCart);