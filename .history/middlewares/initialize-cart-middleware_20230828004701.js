const Cart = require('../models/cart');

const countNew = 0;
const countExisting = 0;

function initializeCart(req, res, next) {

    let cart;

    if (!req.session.cart) {
        console.log('NEW CART');
        countNew++;
        cart = new Cart();
    } else {
        const sessionCartItem = req.session.cart;
        console.log('EXISTING CART');
        countExisting++;
        cart = new Cart(
            sessionCartItem.items,
            sessionCartItem.cartTotalQuantity,
            sessionCartItem.cartTotalPrice
        );
    }
    res.locals.cart = cart;
    console.log('++++++++++++++++NEW: ' + countNew);
    console.log('++++++++++++++++EXISTING: ' + countExisting);
    next();
}

module.exports = {
    initializeCart: initializeCart
}