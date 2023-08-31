const Cart = require('../models/cart');



async function addToCart(req, res, next) {

await req.session.cart.addToCart();//aggiungi product come parametro    

}

module.exports = {
    addToCart: addToCart
}