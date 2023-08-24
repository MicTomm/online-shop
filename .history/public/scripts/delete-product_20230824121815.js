const deleteButtonIntoProductCardView = document.querySelectorAll('#product-item-action button');

async function deleteProduct(action) {
    const deleteButton = action.target;
    const productId = deleteButton.dataset.id;
    const csrfToken = deleteButton.dataset.csrf;

    console.log('DATA_SET - productId: ' + productId);
    console.log('DATA_SET - csrfToken: ' + csrfToken);
    
    // const response = fetch(`/admin/products/${productId}?_csrf=${csrfToken}`,
    //     {
    //         method: 'DELETE'
    //     }
    // );
    
    // if (!response.ok) {
    //     alert('Something went wrong!');
    //     return;
    // }

    // //è l'elemento <li> che rappresenta il contenitore finale della cardView
    // deleteButtonIntoProductCardView.parentElement.parentElement.parentElement.parentElement.remove(); 

    const response = await fetch('/admin/products/' + productId + '?_csrf=' + csrfToken, {
        method: 'DELETE'
      });
    
      if (!response.ok) {
        alert('Something went wrong!');
        return;
      }
    
      deleteButton.parentElement.parentElement.parentElement.parentElement.remove();
    }

for (const deleteButton of deleteButtonIntoProductCardView) {

    deleteButton.addEventListener('click', deleteProduct);
}