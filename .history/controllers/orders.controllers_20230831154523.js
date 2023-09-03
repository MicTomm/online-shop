function getOrders(req, res, next) {
    res.render('admin/orders/orders');
}

function placeOrder(req, res, next) {
    
}

module.exports = {
    getOrders: getOrders,
    placeOrder: placeOrder
}