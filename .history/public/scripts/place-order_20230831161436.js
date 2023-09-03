const buyProductsForm = document.querySelector('#cart-total form');
console.dir(buyProductsForm);

async function placeOrder(event) {

    const form = event.target;
    const csrfToken = form.dataset.csrf;
    //const cartTotalPrice = form.dataset.

    try {
        const response = await fetch('/admin/orders',
            {
                method: 'POST',
                body: JSON.stringify(
                    {
                        _csrf: csrfToken
                    }),
                headers:
                {
                    'Content-Type': 'application/json'
                }
            })
    } catch (error) {
        console.log('ERROR - update-cart.js (scripts)');
        error.cose = 404;
        throw error;
    };

    if (!response.ok) {
        alert('An Error Occurred');
    }    
}

buyProductsForm.addEventListener('submit', placeOrder);