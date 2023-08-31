const Cart = require('../models/cart');

function initializeCart() {

    if (!req.session.cart) {
        req.session.cart = new Cart();
    }

}

module.exports = {
    initializeCart: initializeCart
}