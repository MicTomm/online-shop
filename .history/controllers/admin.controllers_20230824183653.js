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
    console.log('ProductId: ' + paramId);


    let fetchedProduct;

    try {
        fetchedProduct = await Product.fetchById(paramId);
        console.log('getUpdateProduct - FETCHED_PRODUCT: ');
        console.log(fetchedProduct);
        res.render('admin/products/update-product', {product: fetchedProduct});
    } catch (error) {
        console.log('ERROR - admin.controllers.js - getUpdateProduct()');
        //res.status(404).render('shared/404'); //funziona
        return next();
    }

}

async function updateProduct(req, res, next){

    const productData = req.body;
    const id = req.params.id;
    
    const product = new Product({
        ...productData,
        _id: id
    });

    if (req.file) {
       product.replaceImage(req.file.filename);
    }
    
    try {
        await product.save();
    } catch (error) {
        console.log('ERROR - admin.controllers.ejs - updateProduct()');
        return next();
    }

    res.redirect('/admin/products');
}

async function deleteProduct(req, res, next){
    const productId = req.params.id;
    console.log('admin.controllers.js - deleteProduct() => PRODUCT_ID: ' + productId);
    
    try{
        await Product.deleteProduct(productId);
    } catch(error) {
        console.log('ERROR => admin.controllers.js - deleteProduct()');
        return next();
    }
    
    res.json({message:'Product deleted!'});
}

module.exports = {
    getProducts: getProducts,
    createNewProduct: createNewProduct,
    getNewProduct: getNewProduct,
    getUpdateProduct: getUpdateProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct   
}