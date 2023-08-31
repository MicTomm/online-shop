const addToCartButton = document.getElementById('add-to-cart-btn');
const badge = document.querySelector('.badge');

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

    //gestione aggiornamento badge
     badge.textContent = response.newTotalItems;
}

addToCartButton.addEventListener('click', addToCart);