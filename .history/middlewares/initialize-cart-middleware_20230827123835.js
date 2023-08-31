const Cart = require('../models/cart');

function initializeCart() {

    let cart;

    if (!req.session.cart) {
        cart = new Cart();
    } else {
        const sessionCartItem = req.session.cart;
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