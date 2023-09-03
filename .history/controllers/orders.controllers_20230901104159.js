const Order = require('../models/order');

function getOrders(req, res, next) {
    res.render('customer/orders/your-orders');
}

async function placeOrder(req, res, next) {

    const cartItems = req.session.cart.items;
    const userData = req.session.user;

    const order = new Order(cartItems, userData);

    let savedOrder;

    savedOrder = await order.save();
    try {
    } catch (error) {
        console.log('ERROR - orders.controllers -> placeOrder()');
        return next(error);
    }
   
    req.session.cart = null;

    res.status(201).json({
        message: 'Order saved into DB',
        orderId: savedOrder.insertedId.toString()
    });
}

module.exports = {
    getOrders: getOrders,
    placeOrder: placeOrder
}