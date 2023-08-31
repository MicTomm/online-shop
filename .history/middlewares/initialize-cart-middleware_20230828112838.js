const Cart = require('../models/cart');

function initializeCart(req, res, next) {

    let cart;

    if (!req.session.cart) {
        console.log('NEW CART');
        cart = new Cart();
    } else {
        const sessionCartItem = req.session.cart;
        console.log('EXISTING CART');
        cart = new Cart(
            sessionCartItem.items,
            sessionCartItem.cartTotalQuantity,
            sessionCartItem.cartTotalPrice
        );
    }
    res.locals.cart = cart;
    next();
}

module.exports = {
    initializeCart: initializeCart
}