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

}

module.exports = {
    initializeCart: initializeCart
}