const stripe = require('stripe');

const Order = require('../models/order');

const stripeObj = stripe('sk_test_51Nmcc2CxykYhD7wLC6YKTrXPyTtZKyEUAyAYCqIbyOByLEtAli7admFptadkCnphQEN278fEMV3bWhlOkgVNkwzN003yUIc8tE');

const DOMAIN = 'https://localhost:300'

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

    cart.items.map(
        {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: '{{PRICE_ID}}',
            quantity: 1,
          }
    );

    const session = await stripeObj.checkout.sessions.create({
        line_items: cart.items.map(
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: cart.items.product.price,
                quantity: cart.items.product.itemTotalQuantity,
              }
        ),
        mode: 'payment',
        success_url: `${DOMAIN}/success.html`,
        cancel_url: `${YOUR_DOMAIN}/cancel.html`,
      });
    
      res.redirect(303, session.url);
    

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