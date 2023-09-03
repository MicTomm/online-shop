const updateOrderStatusBtns = document.querySelectorAll('order-actions button');

console.log(updateOrderStatusBtns);

function updateOrderStatus() {

}


for (const button of updateOrderStatusBtns) {

    button.addEventListener('click', updateOrderStatus);
    console.log(button);
}

