const addToCartButton = document.getElementById('add-to-cart-btn');

async function addToCart(action)

const addToCartBtn = action.target;
const prodId = addToCartBtn.dataset.id;
const csrfToken = addToCartBtn.dataset.csrf;

{
    const response = await fetch(`/cart/${prodId}?_csrf=${csrfToken}`, {
        method: POST
    });

    if (!response.ok) {
        alert('Something went wrong');
    }

    

}

addToCartButton.addEventListener('click', addToCart);