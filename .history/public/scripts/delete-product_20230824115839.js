const deleteButtonIntoProductCardView = document.querySelectorAll('#product-item-action button');

function deleteProduct(action) {
    const productId = action.target.dataset.id;
    const csrfToken = action.target.dataset.csrf;

    console.log('DATA_SET - productId: ' + productId);
    console.log('DATA_SET - csrfToken: ' + csrfToken);
    
    const response = fetch(`/admin/products/:${productId}?_csrf=${csrfToken}`,
        {
            method: 'DELETE'
        }
    );
    
    if (!response.ok) {
        alert('Something went wrong!');
        return;
    }

    //è l'elemento <li> che rappresenta il contenitore finale della cardView
    deleteButtonIntoProductCardView.parentElement.parentElement.parentElement.parentElement.remove(); 

}

for (const deleteButton of deleteButtonIntoProductCardView) {

    deleteButton.addEventListener('click', deleteProduct);
}