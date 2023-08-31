const Product = require('../models/product');
const mongodb = require('mongodb');

function getCart(req, res, next) {
    res.render('customer/cart/cart');
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

function updateItem(req, res, next){
    const bodyParams = req.body;
    const productId = bodyParams.productId;
    console.log('cart.controllers -> productid: ' + productId);

    res.redirect('/');

}

module.exports = {
    getCart: getCart,
    addToCart: addToCart,
    updateItem: updateItem
}