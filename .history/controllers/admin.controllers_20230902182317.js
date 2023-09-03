const Product = require('../models/product');
const Order = require('../models/order');

async function getProducts(req, res){

    const products = await Product.fetchAll();

    res.render('admin/products/all-products', {products: products});
}

async function createNewProduct(req, res, next){
    
    const bodyParams = req.body;
    
    const productData = {
        ...bodyParams,
        image: req.file.filename
    }

    const product = new Product(productData);
    
    try {
        await product.save();
    } catch (error) {
        return next(error);
    }

    res.redirect('/admin/products');
    
}

function getNewProduct(req, res){
    res.render('admin/products/new-product');
}

async function getUpdateProduct(req, res, next){
    const paramId = req.params.id;
   
    let fetchedProduct;

    try {
        fetchedProduct = await Product.fetchById(paramId);
        
        res.render('admin/products/update-product', {product: fetchedProduct});
    } catch (error) {
        console.log('ERROR - admin.controllers.js - getUpdateProduct()');
        //res.status(404).render('shared/404'); 
        return next(error);
    }

}

async function updateProduct(req, res, next){

    const productData = req.body;
    const id = req.params.id;
    
    const product = new Product({
        ...productData,
        _id: id
    });

    if (req.file) {
       product.replaceImage(req.file.filename);
    }
    
    try {
        await product.save();
    } catch (error) {
        console.log('ERROR - admin.controllers.ejs - updateProduct()');
        return next(error);
    }

    res.redirect('/admin/products');
}

async function deleteProduct(req, res, next){
    const productId = req.params.id;
    console.log('admin.controllers.js - deleteProduct() => PRODUCT_ID: ' + productId);
    
    try{
        await Product.deleteProduct(productId);
    } catch(error) {
        console.log('ERROR => admin.controllers.js - deleteProduct()');
        return next(error);
    }
    
    res.json({message:'Product deleted!'});
}

async function getOrders(req, res, next){
    
    let orders;

    try{
        orders = await Order.fetchAll();
    } catch (error) {
        return next(error);
    }

    res.render('admin/orders/orders', {orders: orders});
}

async function updateOrder(req, res, next){
    const bodyParams = req.body;

    const orderStatus = bodyParams.orderStatus;
    const orderId = bodyParams.orderId;

    let resp;
    try {
        resp = await Order.updateOrderStatus(orderId, orderStatus);
    } catch (error) {
        console.log('ERROR - admin.controllers.js => updateOrder()');
        return next(error);
    }
    
    console.log('=====================');
    console.log(resp);

    res.json({
        message: 'Status Updated'
    });
}

module.exports = {
    getProducts: getProducts,
    createNewProduct: createNewProduct,
    getNewProduct: getNewProduct,
    getUpdateProduct: getUpdateProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    getOrders: getOrders,
    updateOrder: updateOrder   
}