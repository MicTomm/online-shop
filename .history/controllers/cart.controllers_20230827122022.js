const Cart = require('../models/cart');

async function addToCart(req, res, next) {

    const paramId = req.params.id;

    try{
        await req.session.cart.addToCart(paramId);
    } catch (error) {
        console.log('ERROR - cart.controllers - addToCart()');
        return next(error);    
    }

}

module.exports = {
    addToCart: addToCart
}