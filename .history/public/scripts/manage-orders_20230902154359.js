const updateOrderStatusForms = document.querySelectorAll('.order-actions form');

function updateOrderStatus(event) {
    event.preventDefault();

    const form = event.target;

    const formData = new FormData(form);

    const orderId = formData.get('orderid');
    const csrfToken = formData.get('_csrf');
    const orderStatus = formData.get('status');
    

    console.log(orderId);
    console.log(csrfToken);
    console.log(orderStatus);

    // fetch(`/admin/orders/${orderId}`, {
    //     method: 'PATCH',
    //     body: JSON.stringify({
    //         orderId: orderId,
    //         _csrf: csrfToken
    //     }),
    //     headers: {
    //         'Content-Type':'application/json'
    //     }
    // });
}


for (const form of updateOrderStatusForms) {

    form.addEventListener('submit', updateOrderStatus);
   
}

