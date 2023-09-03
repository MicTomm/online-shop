const Order = require('../models/order');

function getOrders(req, res, next) {
    res.render('admin/orders/orders');
}


module.exports = {
    getOrders: getOrders,
    //placeOrder: placeOrder
}