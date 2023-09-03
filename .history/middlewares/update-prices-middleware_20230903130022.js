const Cart = require('../models/cart');

function checkForPricesUpdate(req, res, next){
    
    const cart = res.locals.cart;
    
    cart.updatePrices();

    next();
}

module.exports = {
    checkForPricesUpdate: checkForPricesUpdate
}