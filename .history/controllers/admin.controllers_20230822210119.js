const Product = require('../models/product');

async function getProducts(req, res){

    const products = await Product.fetchAll();

    res.render('admin/products/all-products', {products: products});
}

async function createNewProduct(req, res, next){
    
    console.log(req.file);
    
    const bodyParams = req.body;
    
    const productData = {
        ...bodyParams,
        image: req.file.filename
    }

    const product = new Product(productData);

    console.log('PRODUCT');
    console.log(product);
    
    try {
        await product.save();
    } catch (error) {
        return next();
    }

    res.redirect('/admin/products');
    
}

function getNewProduct(req, res){
    res.render('admin/products/new-product');
}

async function getUpdateProduct(req, res, next){
    const paramId = req.params.id;

    let fetchedProduct;

    try {
        fetchedProduct = await Product.fetchById(paramId);
    } catch (error) {
        console.log('ERROR - admin.controllers.ejs - getUpdateProduct()');
        return next();
    }

    res.render('update-product', {product: fetchedProduct});
}

async function updateProduct(req, res, next){

    const productData = req.body;
    //const productId = req.params.id;

    const product = new Product(...productData);
    try {
        await product.update();
    } catch (error) {
        console.log('ERROR - admin.controllers.ejs - updateProduct()');
        return next();
    }
}

module.exports = {
    getProducts: getProducts,
    createNewProduct: createNewProduct,
    getNewProduct: getNewProduct,
    getUpdateProduct: getUpdateProduct,
    updateProduct: updateProduct
}