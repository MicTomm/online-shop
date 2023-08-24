const express = require('express');

const adminController = require('../controllers/admin.controllers');
const imageUploadMiddleware = require('../middlewares/image-upload-middleware');

const router = express.Router();

router.get('/products', adminController.getProducts);

router.post('/products', imageUploadMiddleware, adminController.createNewProduct);

router.get('/products/new', adminController.getNewProduct);

router.get('/products/update/:id', adminController.getUpdateProduct );

router.post('/products/update/:id', imageUploadMiddleware, adminController.updateProduct);

module.exports = router;
