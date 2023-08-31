const Cart = require('../models/cart');



async function addToCart(req, res, next) {

const paramId = req.params.id; 

await req.session.cart.addToCart(paramId);    

}

module.exports = {
    addToCart: addToCart
}