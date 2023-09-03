const updateOrderStatusForms = document.querySelectorAll('.order-actions form');

function updateOrderStatus(event) {
    event.preventDefault();

    const form = event.target;

    const formData = new FormData(form);

    const orderId = formData.id;
    const csrfToken = formData.csrfToken;

    console.log(orderId);
    console.log(csrfToken);

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

