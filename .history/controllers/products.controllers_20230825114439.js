const Product = require('../models/product');

async function getAllProducts(req, res, next){
    
    let products;

    try {
        products = await Product.fetchAll();
    } catch (error) {
        console.log('ERROR - products.controllers - getProducts()');
        return next(error);
    }

    res.render('customer/products/all-products', {products: products});

}

async function getSingleProduct(req, res, next){
    // const productId = req.params.id;
    // console.log('getSingleProduct() => productId: ' + productId);
    console.log('getSingleProduct() => productParams: ');
    console.log(req.params);
    
    let productDoc;
    
    //productDoc = await Product.fetchById(productId);
    // try {
    // } catch (error) {
    //     console.log('ERROR - products.controllers - getSingleProduct()');
    //     return next();
    // }

    //res.render('customer/products/product-details', {product: productDoc});
}

module.exports = {
    getAllProducts: getAllProducts,
    getSingleProduct: getSingleProduct
}
