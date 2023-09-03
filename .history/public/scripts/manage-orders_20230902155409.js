const updateOrderStatusForms = document.querySelectorAll('.order-actions form');

async function updateOrderStatus(event) {
    event.preventDefault();

    const form = event.target;

    const formData = new FormData(form);

    const orderId = formData.get('orderid');
    const csrfToken = formData.get('_csrf');
    const orderStatus = formData.get('status');


    console.log(orderId);
    console.log(csrfToken);
    console.log(orderStatus);

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
    }
}


for (const form of updateOrderStatusForms) {

    form.addEventListener('submit', updateOrderStatus);

}

