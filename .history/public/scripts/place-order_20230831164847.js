const buyProductsForm = document.querySelector('#cart-total form');
console.dir(buyProductsForm);

async function placeOrder(event) {

    event.preventDefault();

    const form = event.target;
    const csrfToken = form.dataset.csrf;
    //const cartTotalPrice = form.dataset.

    let response;

    try {
        response = await fetch('/orders/',
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
    
    console.log(response.message);
}

buyProductsForm.addEventListener('submit', placeOrder);