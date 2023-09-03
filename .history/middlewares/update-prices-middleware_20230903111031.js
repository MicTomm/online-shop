const Cart = require('../models/cart');

function checkForPricesUpdate(){
    Cart.updatePrices();
}

module.exports = {
    checkForPricesUpdate: checkForPricesUpdate
}