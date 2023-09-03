const Cart = require('../models/cart');

async function checkForPricesUpdate(req, res, next){
    
    const cart = res.locals.cart;
    
    await cart.updatePrices();

    next();
}

module.exports = {
    checkForPricesUpdate: checkForPricesUpdate
}