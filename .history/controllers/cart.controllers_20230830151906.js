const Product = require('../models/product');
const Cart = require('../models/cart');

function getCart(req, res, next) {

    let inputData = req.session.inputData;

    if (!inputData) {
        inputData = {
            hasError: false,
            message: ''
        }
    }

    req.session.inputData = null;

    res.render('customer/cart/cart', {inputData: inputData});
}

async function addToCart(req, res, next) {
   
    const productId = req.body.productId.trim();

    const cart = res.locals.cart;

    console.log('CONTROLLER -> addToCart()');
    console.log(cart);


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

    if (itemTotalQuantity.trim() === '' || itemTotalQuantity === null) {

        req.session.inputData = {
            hasError: true,
            message: "Fill the field, please"
        }

        req.session.save(function () {
            return res.redirect('/cart/');
        });
        
        return;
    }

    const cart = res.locals.cart;

    let product;

    try {
        product = await Product.fetchById(productId);
    } catch (error) {
        console.log('ERROR - cart.controllers - updateItem');
        return next(next);
    }

    const itemTotalPrice = cart.updateItem(product, itemTotalQuantity);

    req.session.cart = cart;

    res.status(201).json({
        message: 'Single Cart Item Updated!',
        cartTotalPrice: cart.cartTotalPrice,
        itemTotalPrice: itemTotalPrice 
         });    

}

module.exports = {
    getCart: getCart,
    addToCart: addToCart,
    updateItem: updateItem
}