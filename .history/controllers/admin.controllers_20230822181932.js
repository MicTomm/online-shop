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

function getUpdateProduct(req, res){
    const paramId = req.param.id;

    const product = null;

    res.render('update-product', {product: product});
}

function updateProduct(req, res){

    const productData = req.body;

    const product = new Product(...productData);

}

module.exports = {
    getProducts: getProducts,
    createNewProduct: createNewProduct,
    getNewProduct: getNewProduct,
    getUpdateProduct: getUpdateProduct,
    updateProduct: updateProduct
}