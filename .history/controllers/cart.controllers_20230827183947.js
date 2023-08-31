const Product = require('../models/product');
const mongodb = require('mongodb');

async function addToCart(req, res, next) {

    console.log('CART');
    const productId = req.body.productId.trim();
    console.log('PROD_ID: ' + productId);
    console.log('CSRF_TOKEN: ' + req.body._csrf);

    const cart = res.locals.cart;

    let product;

    try {
        product = await Product.fetchById(productId);
    } catch (error) {
        console.log('ERROR - cart.controllers - addProductToCart()');
        return next(error);
    }
        
    cart.addProductToCart(product);

    req.session.cart = cart;

    res.status(201).json({
        message: 'Cart updated!',
        newTotalItems: cart.totalQuantity
    });
}

module.exports = {
    addToCart: addToCart
}