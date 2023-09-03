const updateOrderStatusForms = document.querySelectorAll('.order-actions form');

function updateOrderStatus(event) {
    event.preventDefault();

    
}


for (const form of updateOrderStatusForms) {

    form.addEventListener('submit', updateOrderStatus);
   
}

