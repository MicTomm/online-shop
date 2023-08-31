async function addToCart(req, res, next) {

    const productId = req.body.productId;
    console.log('PROD_ID: ' + paramId);
    console.log('CSRF_TOKEN: ' + req.body._csrf);

    const cart = res.locals.cart;

    try {
        await cart.addProductToCart(productId);
    } catch (error) {
        console.log('ERROR - cart.controllers - addProductToCart()');
        return next(error);
    }

    req.session.cart = cart;

    res.status(201).json({
        message: 'Cart updated!',
        newTotalItems: cart.totalQuantity
    });
}

module.exports = {
    addToCart: addToCart
}