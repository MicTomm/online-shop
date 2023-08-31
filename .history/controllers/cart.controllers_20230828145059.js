const Product = require('../models/product');
const mongodb = require('mongodb');

function getCart(req, res, next) {
    res.render();
}

async function addToCart(req, res, next) {
   
    const productId = req.body.productId.trim();

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
        newTotalItems: cart.cartTotalQuantity
    });
}

module.exports = {
    addToCart: addToCart,
}