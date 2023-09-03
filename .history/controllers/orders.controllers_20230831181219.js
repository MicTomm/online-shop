const Order = require('../models/order');

function getOrders(req, res, next) {
    res.render('admin/orders/orders');
}

async function placeOrder(req, res, next) {
    
    const cartItems = req.session.cart.items;
    const userData = req.session.user;

    const order = new Order(cart, userData);
    await order.save();

    res.status(201).json({
        message: 'ok'
    });
}

module.exports = {
    getOrders: getOrders,
    placeOrder: placeOrder
}