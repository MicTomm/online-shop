const multer = require('multer');

const diskStorageConfig = multer.diskStorage({
    //path in cui verrà salvato il file (sul file-system)
    destination: function (req, file, callBack) {
        //null => parametro per gestione errori, in questo caso omessa
        callBack(null, 'product-data/images');
    } ,
    //costruisco id-univoco con cui verrà salvata il file
    filename: function (req, file, callBack) {
        //originalName = nome originale del file con la sua estensione
        callBack(null, Date.now() + "-" + file.originalName);
    }
});

const upload = multer({
    storage: diskStorageConfig
});

//valore della property 'name' dato all'elemento ' input type="file" ' in new-product.ejs
const configuredMulterMiddleware = upload.single('image');

module.exports = configuredMulterMiddleware;