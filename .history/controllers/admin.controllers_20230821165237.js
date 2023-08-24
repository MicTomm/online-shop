function getProducts(req, res){
    res.render('admin/products/all-products');
}

function createNewProduct(req,res){
    console.log(req.body);
    console.log(req.file);

    res.redirect('/products');
    
}

function getNewProduct(req, res){
    res.render('admin/products/new-product');
}

module.exports = {
    getProducts: getProducts,
    createNewProduct: createNewProduct,
    getNewProduct: getNewProduct
}