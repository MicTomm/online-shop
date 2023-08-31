const express = require('express');

const productsControllers = require('../controllers/products.controllers');
//const imageUploadMiddleware = require('../middlewares/image-upload-middleware');

const router = express.Router();

router.get('/products', productsControllers.getAllProducts);

router.get('/products/:id', productsControllers.getSingleProduct);

module.exports = router;