const updateOrderStatusForms = document.querySelectorAll('.order-actions form');

async function updateOrderStatus(event) {
    event.preventDefault();

    const form = event.target;

    const formData = new FormData(form);

    const orderId = formData.get('orderid');
    const csrfToken = formData.get('_csrf');
    const orderStatus = formData.get('status');
  
    let response;
    try {
        response = await fetch(`/admin/orders/${orderId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                orderId: orderId,
                _csrf: csrfToken,
                orderStatus: orderStatus
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log('ERROR - manage-orders.js (scripts)');
        error.code = 404;
        throw error;
    }

    if (!response.ok) {
        alert('Something went wrong');
        return;
    }

    const responseData = await response.json();
    const retrievedStatus = responseData.orderStatus;
    
    //orders.js -> <p><span class="badge">
    //const statusBadge = form.parentElement.parentElement.children[0].children[1].children[0];
    const statusBadge = form.parentElement.parentElement.querySelector('.badge');
    console.dir(statusBadge);

    statusBadge.textContent = retrievedStatus.toUpperCase();
    
}



for (const form of updateOrderStatusForms) {

    form.addEventListener('submit', updateOrderStatus);
    
}

