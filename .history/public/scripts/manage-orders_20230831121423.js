const buyProductsBtn = document.querySelector('#cart-total button');
console.dir(buyProductsBtn);

async function placeOrder(event) {

    const form = event.target;
    const csrftoken = form.dataset.csrf;

    const response = await fetch('/admin/orders',
        {
            method: 'POST',
            body:
            {
                _csrf: csrfToken
            },
            headers:
            {
                'Content-Type': 'application/json'
            }
        });
    
    if (!response.ok) {
        alert('An Error Occourred');
    }    
}

buyProductsBtn.addEventListener('click',);