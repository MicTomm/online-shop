function redirHome(req, res){
    res.redirect('/home');
}

function getHome(req, res){
    res.render('customer/products/all-products');
}

function get401(req, res){
    res.status(401).render('shared/401');
}

function get403(req, res){
    res.status(403).render('shared/403');
}

module.exports = {
    redirHome: redirHome,
    getHome: getHome,
    get401: get401,
    get403: get403
}