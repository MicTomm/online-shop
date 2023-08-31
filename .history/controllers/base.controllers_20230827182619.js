const Product = require('../models/product');

function redirHome(req, res) {
    res.redirect('/home');
}

async function getHome(req, res) {

    let products;

    try {
        products = await Product.fetchAll();
    } catch (error) {
        console.log('ERROR - controllers -> base.controllers - getHome()');
        return next(error);
    }

    res.render('customer/products/all-products', { products: products });
}

function get401(req, res) {
    res.status(401).render('shared/401');
}

function get403(req, res) {
    res.status(403).render('shared/403');
}

module.exports = {
    redirHome: redirHome,
    getHome: getHome,
    get401: get401,
    get403: get403
}