const addToCartButton = document.getElementById('add-to-cart-btn');

async function addToCart(action)

const addToCartBtn = action.target;
const prodId = addToCartBtn.dataset.id;
const csrfToken = addToCart.dataset.csrfToken;

{
    await fetch(`/cart/${prodId}`, {
        method: POST
    });
}

addToCartButton.addEventListener('click', addToCart);