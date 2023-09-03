const updateOrderStatusForms = document.querySelectorAll('.order-actions form');

console.log(updateOrderStatusForms);

function updateOrderStatus() {
    console.log('ciao')
}


for (const form of updateOrderStatusForms) {

    form.addEventListener('submit', updateOrderStatus);
    console.log(form);
}

