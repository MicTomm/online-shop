const Cart = require('../models/cart');

async function addToCart(req, res, next) {

    const paramId = req.params.id;

    const cart = res.locals.cart;

    try{
        await cart.addToCart(paramId);
    } catch (error) {
        console.log('ERROR - cart.controllers - addToCart()');
        return next(error);    
    }

    req.session.cart = cart;

    //res.json({});
}

module.exports = {
    addToCart: addToCart
}