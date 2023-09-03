const buyProductsBtn = document.querySelector('#cart-total button');
console.dir(buyProductsBtn);

async function placeOrder(event) {

    const form = event.target;
    const csrfToken = form.dataset.csrf;

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

    // if (!response.ok) {
    //     alert('An Error Occurred');
    // }    
}

buyProductsBtn.addEventListener('click', placeOrder);