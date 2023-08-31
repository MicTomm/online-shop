const Product = require('../models/product');
const Cart = require('../models/cart');

function getCart(req, res, next) {
    res.render('customer/cart/cart');
}

async function addToCart(req, res, next) {
   
    const productId = req.body.productId.trim();

    const cart = res.locals.cart;

    let product;

    try {
        product = await Product.fetchById(productId);
    } catch (error) {
        console.log('ERROR - cart.controllers - addProductToCart()');
        return next(error);
    }
        
    cart.addProductToCart(product);

    req.session.cart = cart;

    res.status(201).json({
        message: 'Cart updated!',
        newTotalItems: cart.cartTotalQuantity
    });
}

async function updateItem(req, res, next){
    const bodyParams = req.body;
    const productId = bodyParams.productId;
    const itemTotalQuantity = bodyParams.itemTotalQuantity;
    console.log('cart.controllers -> productid: ' + productId);
    console.log('cart.controllers -> itemTotalQuantity: ' + itemTotalQuantity);

    const cart = res.locals.cart;

    let product;

    try {
        product = await Product.fetchById(productId);
    } catch (error) {
        console.log('ERROR - cart.controllers - updateItem');
        return next(next);
    }

    const itemTotalQnty = cart.updateItem(product, itemTotalQuantity);

    req.session.cart = cart;

    res.status(201).json({
        message: 'Single Cart Item Updated!',
        cartTotalPrice: cart.cartTotalPrice,
        itemTotalPrice: itemTotalQnty 
         });    

}

module.exports = {
    getCart: getCart,
    addToCart: addToCart,
    updateItem: updateItem
}