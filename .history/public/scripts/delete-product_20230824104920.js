const deleteButton = document.querySelectorAll('#product-item-action button');
console.log(deleteButton);

function deleteProduct(action){
    const productId = action.target.dataSet.id;
    const csrf = action.target.dataSet.csrf;

}

deleteButton.addEventListener('click', deleteProduct);