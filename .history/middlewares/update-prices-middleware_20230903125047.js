const Cart = require('../models/cart');

function checkForPricesUpdate(){
    Cart.updatePrices();

    next();
}

module.exports = {
    checkForPricesUpdate: checkForPricesUpdate
}