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
        return next();
    }

}

async function updateProduct(req, res, next){

    const productData = req.body;
    //togliere underscore
    const id = req.params._id;
    console.log('updateProduct() - PRODUCT_ID: ' + id);

    const product = new Product({
        ...productData,
        _id: id
    });

    if (req.file) {
       product.replaceImage(req.file.filename);
    }

    console.log('updateImage() - UPDATED_IMAGE:');
    console.log(product);

    await product.save();
    
    // try {
    // } catch (error) {
    //     console.log('ERROR - admin.controllers.ejs - updateProduct()');
    //     return next();
    // }

    res.redirect('/admin/products/all-products');
}

module.exports = {
    getProducts: getProducts,
    createNewProduct: createNewProduct,
    getNewProduct: getNewProduct,
    getUpdateProduct: getUpdateProduct,
    updateProduct: updateProduct
}