const updateOrderStatusForms = document.querySelectorAll('.order-actions form');

function updateOrderStatus(event) {
    event.preventDefault();

    const form = event.target;

    const formData = new FormData(form);

    const id = formData.id;
    const csrfToken = formData.csrfToken;
}


for (const form of updateOrderStatusForms) {

    form.addEventListener('submit', updateOrderStatus);
   
}

