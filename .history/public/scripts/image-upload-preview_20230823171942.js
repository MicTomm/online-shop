const imagePreview = document.getElementById('image-preview');
const filePicker = document.getElementById('image');

console.dir(imagePicker);

function showImagePreview() {
    const files = filePicker.files;
    if (!files || files.length === 0) {
        imagePreview.style.display = 'none';
        return;
    }
    
    /**
     * URL.createObjectURL =>   A string containing an object URL that can be used to reference 
     *                          the contents of the specified source object.
    */
   imagePreview.src = URL.createObjectURL(files[0]);
   imagePreview.style.display = 'block';
   
}

filePicker.addEventListener('change', showImagePreview);