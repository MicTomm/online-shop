const Product = require('../models/product');

async function getProducts(req, res, next){
    
    try{
        const products = await Product.fetchAll();
    } catch (error) {
        console.log('ERROR - products.controllers - getProducts()' );
        return next(error);
    }

    res.render('customer/products/all-products', {products: products});

}