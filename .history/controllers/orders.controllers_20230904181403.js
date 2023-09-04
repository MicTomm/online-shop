const stripe = require('stripe');

const Order = require('../models/order');

const stripeObj = stripe('sk_test_51Nmcc2CxykYhD7wLC6YKTrXPyTtZKyEUAyAYCqIbyOByLEtAli7admFptadkCnphQEN278fEMV3bWhlOkgVNkwzN003yUIc8tE');

async function getOrders(req, res, next) {
    
    const userId = req.session.user.id;
    
    let orders;
    try {
        orders = await Order.fetchAllForUser(userId);
    } catch (error) {
        return next(error);
    }
    
    res.render('customer/orders/your-orders', {orders: orders});
}

async function placeOrder(req, res, next) {

    const cart = req.session.cart;
    const userData = req.session.user;

    const order = new Order(cart, userData);

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