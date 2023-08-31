const Product = require('../models/product');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

async function addToCart(req, res, next) {

    const productId = req.body.productId;
    console.log('PROD_ID: ' + productId);
    console.log('CSRF_TOKEN: ' + req.body._csrf);

    const cart = res.locals.cart;

    let product;

    try {
        product = await Product.fetchById(productId);
    } catch (error) {
        console.log(ERROR - cart.controllers - addProductToCart());
        return next(error);
    }
        
    cart.addProductToCart(product.id);

    req.session.cart = cart;

    res.status(201).json({
        message: 'Cart updated!',
        newTotalItems: cart.totalQuantity
    });
}

module.exports = {
    addToCart: addToCart
}