const Cart = require('../models/cart');

function checkForPricesUpdate(req, res, next){
    Cart.updatePrices();

    next();
}

module.exports = {
    checkForPricesUpdate: checkForPricesUpdate
}