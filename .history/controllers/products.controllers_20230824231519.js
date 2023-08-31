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

module.exports = {
    getAllProducts: getAllProducts
}
