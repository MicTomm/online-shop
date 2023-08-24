const imgElement = document.getElementById('image-preview');
const inputImageElement = document.getElementById('image');


function previewImage(){
    const files = inputImageElement.files;
    console.dir(inputImageElement);
    console.log('inputImageElement.files: ' + files);

    if (!files || files.length === 0) {
        imgElement.style.display = 'none';
        return;
    }

    imgElement.src = URL.createObjectURL(files[0]);
    imgElement.style.display = 'block';
}

inputImageElement.addEventListener('change', previewImage);