async function addToCart(req, res, next) {

    const paramId = req.body.productId;

    const cart = res.locals.cart;

    try{
        await cart.addToCart(paramId);
    } catch (error) {
        console.log('ERROR - cart.controllers - addToCart()');
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