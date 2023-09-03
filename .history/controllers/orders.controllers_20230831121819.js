function getOrders(req, res, next){
res.render('/admin/orders/orders.ejs');
}

module.exports = {
    getOrders: getOrders
}