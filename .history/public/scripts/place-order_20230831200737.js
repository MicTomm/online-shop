const buyProductsForm = document.querySelector('#cart-total form');

const placedOrderMessageParagraph = document.getElementById('order-placed-message');
placedOrderMessageParagraph.style.display = "none";

async function placeOrder(event) {

    event.preventDefault();

    const form = event.target;
    const csrfToken = form.dataset.csrf;
    
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
    
    const responseData = await response.json();
    const orderId = responseData.orderId;
   
    const placeOrderButton = buyProductsForm.children[2];
    
    if (orderId) {
        placeOrderButton.style.display = "none";
        placedOrderMessageParagraph.style.display = "block";
    } else {
        placeOrderButton.style.display = "block";
        placedOrderMessageParagraph.style.display = "none";
    }

}

buyProductsForm.addEventListener('submit', placeOrder);