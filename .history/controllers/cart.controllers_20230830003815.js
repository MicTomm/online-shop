const Product = require('../models/product');
const Cart = require('../models/cart');

function getCart(req, res, next) {
    res.render('customer/cart/cart');
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
    //console.log('cart.controllers -> productid: ' + productId);
    //console.log('cart.controllers -> itemTotalQuantity: ' + itemTotalQuantity);

    const cart = res.locals.cart;

    //console.log('CONTROLLER -> updateItem()');
    //console.log(cart);

    let product;

    try {
        product = await Product.fetchById(productId);
    } catch (error) {
        console.log('ERROR - cart.controllers - updateItem');
        return next(next);
    }

    if (itemTotalQuantity.trim() === '' || itemTotalQuantity === null) {
        console.log('riempi campo');

        //implementare validazione con oggetto validazione da caricare all'url '/' cioè nel metodo getCart del controller con campi vuoti,

        return res.redirect('/cart/');
    }
    const itemTotalPrice = cart.updateItem(product, itemTotalQuantity);

    //console.log('itemTotalPrice: ' + itemTotalPrice);

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