const Order = require('../models/order');

function getOrders(req, res, next) {
    res.render('admin/orders/orders');
}

async function placeOrder(req, res, next) {
    
    const cartItems = req.session.cart.items;
    const userData = req.session.user;

    const order = new Order(cartItems, userData);
    
    let orderDocument;

    try{
        orderDocument = await order.save();
    } catch (error) {
        console.log('ERROR - orders.controllers -> placeOrder()');
        return next(error);
    }

    console.log('savedOrder._id: ' + orderDocument._id);

    res.status(201).json({
        message: 'Order saved into DB',
        orderId: orderDocument._id
    });
}

module.exports = {
    getOrders: getOrders,
    placeOrder: placeOrder
}