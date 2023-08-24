const Product = require('../models/product');

function getProducts(req, res){
    res.render('admin/products/all-products');
}

async function createNewProduct(req, res, next){
    
    console.log(req.file);
    
    const bodyParams = req.body;
    
    const productData = {
        ...bodyParams,
        image: req.file.filename
    }

    console.log(productData);

    const product = new Product(productData);

    console.log('PRODUCT');
    console.log(product);
    
    try{
        await product.save();
    } catch (error) {
        return next();
    }

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