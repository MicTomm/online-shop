const Product = require('../models/product');

function getProducts(req, res){
    res.render('admin/products/all-products');
}

async function createNewProduct(req,res){
    console.log(req.body);
    console.log(req.file);

    const bodyParams = req.body;

    const productData = {
        ...bodyParams,
        fileName: req.file.filename
    }

    const product = new Product(productData);
    await product.save();

    res.redirect('/admin/products');
    
}

function getNewProduct(req, res){
    res.render('admin/products/new-product');
}

module.exports = {
    getProducts: getProducts,
    createNewProduct: createNewProduct,
    getNewProduct: getNewProduct
}