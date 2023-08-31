const Product = require('../models/product');

async function getAllProducts(req, res, next){
    
    let products;

    try {
        products = await Product.fetchAll();
    } catch (error) {
        console.log('ERROR - products.controllers - getProducts()');
        return next(error);
    }

    res.render('customer/products/all-products', {products: products});

}

async function getSingleProduct(req, res, next){
    const productId = req.params.id;
    
    let productDoc;
    
    try {
        productDoc = await Product.fetchById(productId);
    } catch (error) {
        console.log('ERROR - products.controllers - getSingleProduct()');
        return next();
    }
}

module.exports = {
    getAllProducts: getAllProducts
}
