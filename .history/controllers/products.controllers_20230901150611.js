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
    
    try {
        const productDoc = await Product.fetchById(req.params.id);
        console.log(productDoc);
        res.render('customer/products/product-details', {product: productDoc});
    } catch (error) {
        console.log('ERROR - products.controllers - getSingleProduct()');
        return next();
    }

}

module.exports = {
    getAllProducts: getAllProducts,
    getSingleProduct: getSingleProduct
}
