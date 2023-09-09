const stripe = require('stripe');

const Order = require('../models/order');
const { render } = require('ejs');

const stripeObj = stripe('sk_test_51Nmcc2CxykYhD7wLC6YKTrXPyTtZKyEUAyAYCqIbyOByLEtAli7admFptadkCnphQEN278fEMV3bWhlOkgVNkwzN003yUIc8tE');

const DOMAIN = 'http://localhost:3000';

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

async function placeOrder(req, res) {

    const cart = req.session.cart;
    // const userData = req.session.user;
     
    // const order = new Order(cart, userData);

    //  let savedOrder;

    // savedOrder = await order.save();
    // try {
    // } catch (error) {
    //     console.log('ERROR - orders.controllers -> placeOrder()');
    //     return next(error);
    // }

    //  req.session.cart = null;
    
    const session = await stripeObj.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: cart.items.map(function (item) {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.product.title
                    },
                    unit_amount: +item.product.price.toFixed(2) * 100
                },
                quantity: item.itemTotalQuantity,
            }
        }),
        mode: 'payment',
        success_url: `${DOMAIN}/orders/success`,
        cancel_url: `${DOMAIN}/orders/cancel`,
    });

      res.redirect(303, session.url);
 
}

async function getSuccess(req, res, next){

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

    res.locals.cart.cartTotalQuantity = 0;
    req.session.cart = null;

    res.render('customer/orders/success');
}

function getCancel(req, res){
    res.render('customer/orders/cancel');
}


module.exports = {
    getOrders: getOrders,
    placeOrder: placeOrder,
    getSuccess: getSuccess,
    getCancel: getCancel
}