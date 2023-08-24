const deleteButtonIntoProductCardView = document.querySelectorAll('#product-item-action button');

function deleteProduct(action) {
    const productId = action.target.dataSet.id;
    const csrfToken = action.target.dataSet.csrf;

    console.log('DATA_SET - productId: ' + productId);
    console.log('DATA_SET - csrfToken: ' + csrfToken);

    fetch(`/admin/products/:${productId}?csrf=${csrfToken}`,
        {
            method: 'DELETE'
        }
    );
}

for (const deleteButton of deleteButtonIntoProductCardView) {

    deleteButton.addEventListener('click', deleteProduct);
}