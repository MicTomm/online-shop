const Order = require('../models/order');

function getOrders(req, res, next) {
    res.render('admin/orders/orders');
}

function placeOrder(req, res, next) {
    
    res.status(201).json({
        message: 'ok'
    });
}

module.exports = {
    getOrders: getOrders,
    placeOrder: placeOrder
}