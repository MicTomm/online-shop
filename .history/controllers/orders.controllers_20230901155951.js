const Order = require('../models/order');

async function getOrders(req, res, next) {
    
    const userId = req.session.user.id;
    
    let orders;
    try {
        orders = await Order.fetchAllForUser(userId);
    } catch (error) {
        return next(error);
    }
    
    console.log('----------ORDER--------------');
    for (const order of orders) {
        console.log(order);
        console.log(order.formattedDate);
    }

    // const formattedDate = orders.date.toLocaleDateString('en-GB', {
    //     weekday: 'short',
    //     day: 'numeric',
    //     month: 'long',
    //     year: 'numeric',
    // });

    console.log('formattedDate => ' + formattedDate);

    res.render('customer/orders/your-orders', {orders: orders, formattedDate: formattedDate});
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