const multer = require('multer');

multer.diskStorage({
    //images => è il nome dato alla property name dell'elemento input type = "file" in new-product.ejs
    destination: function (req, file, callBack) {
        //null => parametro per gestione errori, in questo caso omessa
        callBack(null, 'product-data/images');
    } ,
    filename: function (req, fileName, callBAck) {
        //originalName = nome originale del file con la sua estensione
        callBack(null, Date.now() + "-" + file.originalName);
    }
});