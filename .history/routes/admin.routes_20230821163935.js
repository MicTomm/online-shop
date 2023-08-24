const express = require('express');

const adminController = require('../controllers/admin.controllers');
const imageUploadMiddleware = require('../middlewares/image-upload-middleware');

const router = express.Router();

router.get('/products', adminController.getProducts);

router.post('/products', imageUploadMiddleware, adminController.createNewProduct);

router.get('/products/new', adminController.getNewProduct);

module.exports = router;
