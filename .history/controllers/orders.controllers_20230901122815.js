const Order = require('../models/order');

async function getOrders(req, res, next) {

    //fetchAllForUser
    const userId = req.session.user.id;
    const orders = await Order.fetchAllForUser(userId);

    //console.log(orders);

    for (const order of orders) {
        console.log(order);
    }

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

    let isCartEmpty = false;
    req.session.cart = null;
    if(!req.session.cart){
        isCartEmpty = true;
    }

    res.status(201).json({
        message: 'Order saved into DB',
        orderId: savedOrder.insertedId.toString(),
        isCartEmpty: isCartEmpty
    });
}

module.exports = {
    getOrders: getOrders,
    placeOrder: placeOrder
}