const Order = require('../models/order');

function getOrders(req, res, next) {
    res.render('admin/orders/orders');
}

function placeOrder(req, res, next) {
    //const order = new Order();

    console.log('CART');
    console.log(req.session.cart);
    console.log('USER');
    console.log(req.session.user);

    res.status(201).json({
        message: 'ok'
    });
}

module.exports = {
    getOrders: getOrders,
    placeOrder: placeOrder
}