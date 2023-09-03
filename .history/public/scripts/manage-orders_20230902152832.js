const updateOrderStatusForms = document.querySelectorAll('.order-actions form');

function updateOrderStatus(event) {
    event.preventDefault();

    const form = event.target;

    const formData = new FormData(form);

    formData.id;
    formData.csrf;
}


for (const form of updateOrderStatusForms) {

    form.addEventListener('submit', updateOrderStatus);
   
}

