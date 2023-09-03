const Order = require('../models/order');

function getOrders(req, res, next) {
    res.render('admin/orders/orders');
}

async function placeOrder(req, res, next) {
    
    const cartItems = req.session.cart.items;
    const userData = req.session.user;

    const order = new Order(cartItems, userData);
    
    let savedOrder;

    try{
        savedOrder = await order.save();
    } catch (error) {
        console.log('ERROR - orders.controllers -> placeOrder()');
        return next(error);
    }

    res.status(201).json({
        message: 'ok'
    });
}

module.exports = {
    getOrders: getOrders,
    placeOrder: placeOrder
}