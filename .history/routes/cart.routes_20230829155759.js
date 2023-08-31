const express = require('express');
const cartControllers = require('../controllers/cart.controllers');


const router = express.Router();

router.get('/', cartControllers.getCart);

router.post('/items', cartControllers.addToCart);

router.post('/items/item/update', cartControllers.updateItem);

module.exports = router;
