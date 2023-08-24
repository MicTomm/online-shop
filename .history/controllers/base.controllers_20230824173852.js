function redirHome(req, res){
    res.redirect('/home');
}

function getHome(req, res){
    res.render('customer/products/all-products');
}
