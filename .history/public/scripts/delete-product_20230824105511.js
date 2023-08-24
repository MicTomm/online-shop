const deleteButtonIntoProductCardView = document.querySelectorAll('#product-item-action button');

function deleteProduct(action){
    // const productId = action.target.dataSet.id;
    // const csrf = action.target.dataSet.csrf;

    console.log('DELETE');
}

for (const deleteButton of deleteButtonIntoProductCardView) {

    deleteButton.addEventListener('click', deleteProduct);
}