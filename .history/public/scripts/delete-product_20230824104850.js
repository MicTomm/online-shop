const deleteButton = document.querySelectorAll('#product-item-action button');
console.log(deleteButton);

function deleteProduct(action){
    const productId = action.target.dataSet.id;

}

deleteButton.addEventListener('click', deleteProduct);